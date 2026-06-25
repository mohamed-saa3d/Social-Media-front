import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { OtpForm } from "@/features/auth/ui/OtpForm";
import { useAuthStore } from "@/app/store/auth.store";

export function VerifyOtpPage() {
  const email = useAuthStore((s) => s.tempEmail);

  return (
    <div className="bg-aurora min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-stretch justify-center px-4 py-10">
        <Link
          to="/auth"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="glass rounded-3xl p-7">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground dark:glow">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-semibold">Verify your email</h1>
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">{email ?? "your inbox"}</span>.
              </p>
            </div>
          </div>

          <OtpForm />
        </div>
      </div>
    </div>
  );
}
