import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/features/auth/model/schemas";
import { useRegister } from "@/features/auth/model/useRegister";
import { useAuthStore } from "@/app/store/auth.store";
import { Field } from "./LoginForm";

export function RegisterForm() {
  const navigate = useNavigate();
  const setTempEmail = useAuthStore((s) => s.setTempEmail);
  const { mutateAsync, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutateAsync(values);
      setTempEmail(values.email);
      navigate({ to: "/verify-otp" });
    } catch {
      /* handled below */
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field
        icon={<User className="h-4 w-4" />}
        label="Username"
        placeholder="nova_helix"
        error={errors.username?.message}
        autoComplete="username"
        {...register("username")}
      />
      <Field
        icon={<Mail className="h-4 w-4" />}
        label="Email"
        type="email"
        placeholder="you@domain.com"
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />
      <Field
        icon={<Lock className="h-4 w-4" />}
        label="Password"
        type="password"
        placeholder="At least 8 chars, A-z, 0-9, symbol"
        error={errors.password?.message}
        autoComplete="new-password"
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
        Create account
      </button>
    </form>
  );
}

function extractErr(e: unknown) {
  const r = e as { response?: { data?: { message?: string } }; message?: string };
  return r?.response?.data?.message ?? r?.message ?? "Something went wrong";
}
