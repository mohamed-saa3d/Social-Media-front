import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Mail, Lock } from "lucide-react";
import { loginSchema, type LoginInput } from "@/features/auth/model/schemas";
import { useLogin } from "@/features/auth/model/useLogin";
import { useAuthStore } from "@/app/store/auth.store";

export function LoginForm() {
  const navigate = useNavigate();
  const setCredentials = useAuthStore((s) => s.setCredentials);
  const { mutateAsync, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await mutateAsync(values);
      setCredentials(res);
      navigate({ to: "/feed" });
    } catch {
      /* handled below */
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field
        icon={<Mail className="h-4 w-4" />}
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@domain.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Field
        icon={<Lock className="h-4 w-4" />}
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      {error && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {extractErr(error)}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground transition-shadow hover:dark:glow disabled:opacity-60"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign in
      </button>
    </form>
  );
}

function extractErr(e: unknown) {
  const r = e as { response?: { data?: { message?: string } }; message?: string };
  return r?.response?.data?.message ?? r?.message ?? "Something went wrong";
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: React.ReactNode;
};
const Field = Object.assign(
  function FieldInner({ label, error, icon, ...rest }: FieldProps) {
    return (
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="relative block">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </span>
          )}
          <input
            {...rest}
            className={`h-11 w-full rounded-xl border bg-background/60 ${icon ? "pl-10" : "pl-4"} pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 ${
              error ? "border-destructive/60" : "border-border"
            }`}
          />
        </span>
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </label>
    );
  },
  { displayName: "Field" },
);
export { Field };
