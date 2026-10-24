"use client";

import { useId, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { ProductCard } from "../ProductCard/ProductCard";
import { SsoButtonGroup, type SsoProvider } from "../SsoButton/SsoButton";
import { TextInput } from "../TextInput/TextInput";
import type { Plan } from "../_shared/plans";

export type AuthFormMode = "login" | "signup";

/** Every visible and accessible string of AuthForm. */
export interface AuthFormLabels {
  /** Title in login mode. */
  login: string;
  /** Title in signup mode. */
  signup: string;
  /** E-mail field placeholder and accessible name. */
  email: string;
  /** Password field placeholder and accessible name. */
  password: string;
  /** Accessible name of the reveal-password toggle. */
  showPassword: string;
  /** Accessible name of the hide-password toggle. */
  hidePassword: string;
  /** Submit button in login mode. */
  submitLogin: string;
  /** Submit button in signup mode. */
  submitSignup: string;
  /** Forgot-password link (login mode). */
  forgot: string;
  /** Line above the SSO buttons. */
  sso: string;
  /** Accessible name of each SSO button; "{provider}" is replaced by the provider name. */
  ssoProvider: string;
  /** Institute login button. */
  institution: string;
  /** Legal copy (signup mode). */
  terms: string;
  /** Prompt before the sign-up link (login mode). */
  noAccount: string;
  /** Sign-up link (login mode). */
  toSignup: string;
  /** Prompt before the login link (signup mode). */
  hasAccount: string;
  /** Login link (signup mode). */
  toLogin: string;
  /** ProductCard's change link (signup with product). */
  changePlan: string;
}

// Production strings (Copy/production-strings.json). "Login with your institute" has no strings-file entry and
// matches LoginModal. German: authFormDe in src/i18n/de.ts.
export const authFormLabels: AuthFormLabels = {
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
  ssoProvider: "Sign in with {provider}",
  institution: "Login with your institute",
  terms: "By registering your account, you agree to our terms and conditions, privacy and services agreement.",
  noAccount: "Don't have an account?",
  toSignup: "Sign up",
  hasAccount: "Do you already have an account?",
  toLogin: "Login",
  changePlan: "< Select another plan",
};

export interface AuthFormProps {
  /** login (default) or signup: switches title, submit text (Login / Continue), forgot-password link (login) and terms copy (signup). */
  mode?: AuthFormMode;
  /**
   * Signup from checkout: the chosen plan above the form (ProductCard). Shown in signup mode only. Content: pass
   * plansEn.* on English screens, plansDe.* on DE screens (src/content/plans.ts).
   */
  product?: Plan;
  /** ProductCard's "< Select another plan" link click. */
  onChangeProduct?: () => void;
  /**
   * Label text, merged over the English defaults (authFormLabels, production strings); pass German on DE screens
   * (authFormDe).
   */
  labels?: Partial<AuthFormLabels>;
  /** Form submit with e-mail and password; the native submit is prevented. */
  onSubmit?: (values: { email: string; password: string }) => void;
  /** Forgot-password link click (login mode only). */
  onForgotPassword?: () => void;
  /** Called with the clicked SSO provider. */
  onSso?: (provider: SsoProvider) => void;
  /** Institute login button click. */
  onInstitutionLogin?: () => void;
  /** The "Sign up" / "Login" link under the form. */
  onSwitchMode?: () => void;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

const link = "rounded-sm outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Page-level login and signup form (login, signup, signup with a chosen plan):
 * title, optional plan card, e-mail + password, white submit, SSO providers, institute login, legal copy and
 * the switch to the other mode. The title centres below 384px of container width (mobile). The dialog
 * version with close / cancel is LoginModal.
 * Use for: dedicated login and signup pages, including signup from checkout (`product`).
 * Not for: logging in on top of an existing page (use LoginModal).
 */
export function AuthForm({
  mode = "login",
  product,
  onChangeProduct,
  labels,
  onSubmit,
  onForgotPassword,
  onSso,
  onInstitutionLogin,
  onSwitchMode,
  className,
}: AuthFormProps) {
  const t = { ...authFormLabels, ...labels };
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

      {signup && product && <ProductCard product={product} changeLabel={t.changePlan} onChangeProduct={onChangeProduct} />}

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
        <SsoButtonGroup onSelect={onSso} labelFor={(name) => t.ssoProvider.replace("{provider}", name)} />
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
