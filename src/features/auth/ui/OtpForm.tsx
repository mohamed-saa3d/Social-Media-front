import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, RotateCcw } from "lucide-react";
import { useVerifyOtp } from "@/features/auth/model/useVerifyOtp";
import { useResendOtp } from "@/features/auth/model/useResendOtp";
import { useAuthStore } from "@/app/store/auth.store";

const LEN = 6;

export function OtpForm() {
  const email = useAuthStore((s) => s.tempEmail);
  const setCredentials = useAuthStore((s) => s.setCredentials);
  const navigate = useNavigate();
  const verify = useVerifyOtp();
  const resend = useResendOtp();

  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [resentAt, setResentAt] = useState<number | null>(null);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!email) navigate({ to: "/auth" });
  }, [email, navigate]);

  const setAt = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = ch;
      return next;
    });
    if (ch && i < LEN - 1) inputs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < LEN - 1) inputs.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LEN);
    if (!text) return;
    e.preventDefault();
    const next = Array(LEN).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    inputs.current[Math.min(text.length, LEN - 1)]?.focus();
  };

  const code = digits.join("");
  const ready = code.length === LEN && /^\d{6}$/.test(code);

  const submit = async () => {
    if (!ready || !email) return;
    try {
      const res = await verify.mutateAsync({ email, code });
      setCredentials(res);
      navigate({ to: "/feed" });
    } catch {
      /* handled below */
    }
  };

  useEffect(() => {
    if (ready) submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const onResend = async () => {
    if (!email) return;
    await resend.mutateAsync(email).catch(() => {});
    setResentAt(Date.now());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            value={d}
            onChange={(e) => setAt(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            className="h-14 w-12 rounded-xl border border-border bg-background/60 text-center font-display text-2xl font-semibold outline-none transition-colors focus:border-primary/70 focus:ring-2 focus:ring-primary/30 sm:h-16 sm:w-14"
          />
        ))}
      </div>

      {verify.error && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {extractErr(verify.error)}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={!ready || verify.isPending}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground transition-shadow hover:dark:glow disabled:opacity-60"
      >
        {verify.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        Verify & continue
      </button>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Didn't get the code?</span>
        <button
          type="button"
          onClick={onResend}
          disabled={resend.isPending}
          className="inline-flex items-center gap-2 text-primary hover:text-glow"
        >
          {resend.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RotateCcw className="h-4 w-4" />
          )}
          Resend
        </button>
      </div>
      {resentAt && (
        <p className="text-xs text-muted-foreground">A fresh code is on its way to {email}.</p>
      )}
    </div>
  );
}

function extractErr(e: unknown) {
  const r = e as { response?: { data?: { message?: string } }; message?: string };
  return r?.response?.data?.message ?? r?.message ?? "Invalid code";
}
