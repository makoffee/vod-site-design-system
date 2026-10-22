"use client";

import { useId, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { ProductCard } from "../ProductCard/ProductCard";
import { SsoButtonGroup, type SsoProvider } from "../SsoButton/SsoButton";
import { TextInput } from "../TextInput/TextInput";
import type { Locale } from "../_shared/locale";
import type { PlanId } from "../_shared/plans";

export type AuthFormMode = "login" | "signup";

// Production strings (Copy/production-strings.json). "Login with your institute" has no strings-file entry;
// en/de follow the LoginModal master.
const copy: Record<Locale, Record<string, string>> = {
  en: {
    login: "Login",
    signup: "Create your account",
    email: "E-Mail",
    password: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    submitLogin: "Login",
    submitSignup: "Continue",
    forgot: "Forgot password",
    sso: "or sign in with SSO",
    institution: "Login with your institute",
    terms: "By registering your account, you agree to our terms and conditions, privacy and services agreement.",
    noAccount: "Don't have an account?",
    toSignup: "Sign up",
    hasAccount: "Do you already have an account?",
    toLogin: "Login",
    changePlan: "< Select another plan",
  },
  de: {
    login: "Anmelden",
    signup: "Konto erstellen",
    email: "E-Mail",
    password: "Passwort",
    showPassword: "Passwort anzeigen",
    hidePassword: "Passwort verbergen",
    submitLogin: "Anmelden",
    submitSignup: "Weiter",
    forgot: "Passwort vergessen",
    sso: "oder mit SSO anmelden",
    institution: "Mit Hochschul-Login anmelden",
    terms: "Mit der Registrierung stimmst du unseren AGB, der Datenschutzerklärung und den Servicebedingungen zu.",
    noAccount: "Noch kein Konto?",
    toSignup: "Registrieren",
    hasAccount: "Hast du bereits ein Konto?",
    toLogin: "Anmelden",
    changePlan: "< Anderes Abo wählen",
  },
};

export interface AuthFormProps {
  mode?: AuthFormMode;
  /** Signup from checkout: the chosen plan above the form (ProductCard). */
  product?: PlanId;
  onChangeProduct?: () => void;
  locale?: Locale;
  onSubmit?: (values: { email: string; password: string }) => void;
  onForgotPassword?: () => void;
  onSso?: (provider: SsoProvider) => void;
  onInstitutionLogin?: () => void;
  /** The "Sign up" / "Login" link under the form. */
  onSwitchMode?: () => void;
  className?: string;
}

const link = "rounded-sm outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Page-level login and signup form (design "login | 1440px", "signup | 1440px", "signup with product card"):
 * title, optional plan card, e-mail + password, white submit, SSO providers, institute login, legal copy and
 * the switch to the other mode. The title centres below 384px of container width (393 screens). The dialog
 * version with close / cancel is LoginModal.
 */
export function AuthForm({
  mode = "login",
  product,
  onChangeProduct,
  locale = "en",
  onSubmit,
  onForgotPassword,
  onSso,
  onInstitutionLogin,
  onSwitchMode,
  className,
}: AuthFormProps) {
  const t = copy[locale];
  const titleId = useId();
  const signup = mode === "signup";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit?.({ email: String(data.get("email") ?? ""), password: String(data.get("password") ?? "") });
  };

  return (
    <section aria-labelledby={titleId} className={cn("@container flex w-full flex-col gap-7 text-white", className)}>
      <h1 id={titleId} className="m-0 text-center text-2xl leading-8 font-bold @sm:text-left">
        {signup ? t.signup : t.login}
      </h1>

      {signup && product && <ProductCard product={product} locale={locale} changeLabel={t.changePlan} onChangeProduct={onChangeProduct} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput type="email" name="email" aria-label={t.email} placeholder={t.email} autoComplete="email" />
        <TextInput
          type="password"
          name="password"
          aria-label={t.password}
          placeholder={t.password}
          autoComplete={signup ? "new-password" : "current-password"}
          showPasswordLabel={t.showPassword}
          hidePasswordLabel={t.hidePassword}
        />
        <Button type="submit" variant="cta-white" className="mt-6">
          {signup ? t.submitSignup : t.submitLogin}
        </Button>
        {!signup && (
          <button type="button" onClick={onForgotPassword} className={cn(link, "mx-auto text-sm")}>
            {t.forgot}
          </button>
        )}
      </form>

      <span aria-hidden className="h-px w-full bg-white/30" />

      <div className="flex flex-col gap-7">
        <p className="m-0 text-center text-base">{t.sso}</p>
        <SsoButtonGroup onSelect={onSso} />
        <Button variant="cta-ghost" onClick={onInstitutionLogin}>
          {t.institution}
        </Button>
      </div>

      {signup && <p className="m-0 px-0 py-1.5 text-center text-sm leading-5">{t.terms}</p>}

      <p className="m-0 text-center text-sm leading-6">
        {signup ? t.hasAccount : t.noAccount}{" "}
        <button type="button" onClick={onSwitchMode} className={cn(link, "text-base font-bold")}>
          {signup ? t.toLogin : t.toSignup}
        </button>
      </p>
    </section>
  );
}
