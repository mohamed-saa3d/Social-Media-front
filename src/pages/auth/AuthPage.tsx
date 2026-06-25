import { useState } from "react";
import { Sparkles, Sun, Moon } from "lucide-react";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { RegisterForm } from "@/features/auth/ui/RegisterForm";
import { useThemeStore } from "@/app/store/theme.store";

type Mode = "login" | "register";

export function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const { theme, toggle } = useThemeStore();

  return (
    <div className="bg-aurora relative min-h-screen overflow-hidden">
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-card/70 backdrop-blur transition-colors hover:bg-muted"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Brand panel */}
          <div className="hidden flex-col justify-between lg:flex">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground dark:glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight">Lumen</span>
            </div>

            <div className="space-y-5">
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight">
                A quieter social,
                <br />
                <span className="text-primary dark:text-glow">tuned for you.</span>
              </h1>
              <p className="max-w-md text-muted-foreground">
                Slow feeds, curated voices, zero noise. Built for the night-owls who want their
                socials to feel like a velvet room — not a stadium.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Stat label="Members" value="42.1k" />
                <Stat label="Posts/day" value="8.6k" />
                <Stat label="Cities" value="120+" />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Lumen Labs · Cyber-grunge premium.
            </p>
          </div>

          {/* Form card */}
          <div className="mx-auto w-full max-w-md">
            <div className="glass rounded-3xl p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-semibold">
                    {mode === "login" ? "Welcome back" : "Create your account"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {mode === "login"
                      ? "Sign in to pick up where you left off."
                      : "Join the velvet room. It takes less than a minute."}
                  </p>
                </div>
              </div>

              <div className="mb-6 inline-flex rounded-full border border-border bg-muted/40 p-1 text-sm">
                <ToggleBtn active={mode === "login"} onClick={() => setMode("login")}>
                  Sign in
                </ToggleBtn>
                <ToggleBtn active={mode === "register"} onClick={() => setMode("register")}>
                  Register
                </ToggleBtn>
              </div>

              {mode === "login" ? <LoginForm /> : <RegisterForm />}

              <p className="mt-6 text-center text-xs text-muted-foreground">
                {mode === "login" ? "New here?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="font-medium text-primary hover:underline"
                >
                  {mode === "login" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 px-4 py-3 backdrop-blur">
      <p className="font-display text-xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground dark:glow" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}
