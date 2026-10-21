"use client";

import { X } from "lucide-react";
import { useId, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { ProductCard } from "../ProductCard/ProductCard";
import { SsoButtonGroup, type SsoProvider } from "../SsoButton/SsoButton";
import { TextInput } from "../TextInput/TextInput";
import type { Locale } from "../_shared/locale";
import type { PlanId } from "../_shared/plans";

// en = "login | 1440px" screen + production strings; de = the LoginModal master as it shipped.
// "Stay logged in" has no English source yet (production has no remember-me string).
const copy: Record<Locale, Record<string, string>> = {
  en: {
    title: "Login",
    close: "Close",
    email: "E-Mail",
    emailFocus: "E-Mail",
    sampleEmail: "cinema@example.com",
    password: "Password",
    remember: "Stay logged in",
    forgot: "Forgot password",
    cancel: "Cancel",
    submit: "Login",
    sso: "or sign in with SSO",
    institution: "Login with your institute",
    noAccount: "Don't have an account?",
    register: "Sign up",
  },
  de: {
    title: "Willkommen zurück",
    close: "Schließen",
    email: "E-Mail",
    emailFocus: "E-Mail eingeben",
    sampleEmail: "kino@beispiel.de",
    password: "Passwort",
    remember: "Angemeldet bleiben",
    forgot: "Passwort vergessen?",
    cancel: "Abbrechen",
    submit: "Login",
    sso: "oder mit SSO",
    institution: "Mit Hochschul-Login anmelden",
    noAccount: "Noch kein Konto?",
    register: "Jetzt registrieren.",
  },
};

export interface LoginModalSelectedProductProps {
  /** Master axis visible[on,off] (e1bc9d53d909d53f). */
  visible?: boolean;
  product?: PlanId;
  onChangeProduct?: () => void;
  locale?: Locale;
}

/** Checkout-only slot: the product the user is about to buy (a ProductCard at 352px). */
function SelectedProduct({ visible = true, product = "monthly", onChangeProduct, locale }: LoginModalSelectedProductProps) {
  if (!visible) return null;
  return <ProductCard product={product} locale={locale} onChangeProduct={onChangeProduct ?? (() => {})} />;
}

// Axes mirror the LoginModal master (3981f9f72f51ef72): type[login] × state[default,focus,disabled].
export type LoginModalState = "default" | "focus" | "disabled";

export interface LoginModalProps {
  type?: "login";
  /** focus pins the e-mail field's focus look; disabled is the locked, reduced form. */
  state?: LoginModalState;
  /** Checkout only: shows LoginModal.SelectedProduct above the form. */
  selectedProduct?: LoginModalSelectedProductProps;
  /** Wrap the panel in a fixed, blurred scrim. */
  overlay?: boolean;
  /** Copy language; English by default. */
  locale?: Locale;
  title?: string;
  onClose?: () => void;
  onSubmit?: (values: { email: string; password: string; remember: boolean }) => void;
  onForgotPassword?: () => void;
  onSso?: (provider: SsoProvider) => void;
  onInstitutionLogin?: () => void;
  onRegister?: () => void;
  className?: string;
}

const textLink =
  "rounded-sm text-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-white";

function LoginModalRoot({
  state = "default",
  selectedProduct,
  overlay = false,
  locale = "en",
  title,
  onClose,
  onSubmit,
  onForgotPassword,
  onSso,
  onInstitutionLogin,
  onRegister,
  className,
}: LoginModalProps) {
  const t = copy[locale];
  const titleId = useId();
  const disabled = state === "disabled";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit?.({
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
      remember: data.get("remember") === "on",
    });
  };

  const panel = (
    <div
      role="dialog"
      aria-modal={overlay || undefined}
      aria-labelledby={titleId}
      className={cn("flex w-full flex-col gap-6 rounded-2xl border border-white/10 bg-black p-6", className)}
    >
      <div className="flex items-center justify-between">
        <h2 id={titleId} className={cn("text-2xl font-bold", disabled ? "text-gray-200" : "text-white")}>
          {title ?? t.title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className={cn(
            "flex size-11 items-center justify-center rounded-sooner outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white",
            disabled ? "text-gray-500" : "text-white",
          )}
        >
          <X className="size-5" strokeWidth={2} aria-hidden />
        </button>
      </div>

      {selectedProduct && <SelectedProduct locale={locale} {...selectedProduct} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <TextInput
          type="email"
          name="email"
          aria-label={t.email}
          autoComplete="email"
          placeholder={state === "focus" ? t.emailFocus : t.email}
          defaultValue={disabled ? t.sampleEmail : undefined}
          state={state === "focus" ? "focus" : disabled ? "disabled" : "default"}
          className={cn(disabled && "opacity-40")}
        />
        <TextInput
          type="password"
          name="password"
          aria-label={t.password}
          autoComplete="current-password"
          placeholder={t.password}
          defaultValue={state === "default" ? undefined : "kinoabend1"}
          state={disabled ? "disabled" : "default"}
          className={cn(disabled && "opacity-40")}
        />
        {!disabled && (
          <>
            <Checkbox name="remember" label={t.remember} defaultChecked state={state === "focus" ? "focus" : "default"} />
            <button type="button" onClick={onForgotPassword} className={cn(textLink, "w-fit text-white")}>
              {t.forgot}
            </button>
          </>
        )}
        <div className="flex gap-4">
          <Button variant="cta-ghost" onClick={onClose} disabled={disabled}>
            {t.cancel}
          </Button>
          <Button type="submit" disabled={disabled}>
            {t.submit}
          </Button>
        </div>
      </form>

      {/* Design gap: the focus master omits this block; only the disabled state drops it here. */}
      {!disabled && (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm leading-6 text-white/70">
              <span className="h-px flex-1 bg-white/30" />
              {t.sso}
              <span className="h-px flex-1 bg-white/30" />
            </div>
            <SsoButtonGroup onSelect={onSso} />
          </div>
          <Button variant="cta-ghost" onClick={onInstitutionLogin} className="backdrop-blur-cta">
            {t.institution}
          </Button>
        </>
      )}

      <p className={cn("text-center text-sm", disabled ? "text-gray-200" : "text-white")}>
        {t.noAccount}{" "}
        <button type="button" onClick={onRegister} className={textLink}>
          {t.register}
        </button>
      </p>
    </div>
  );

  if (!overlay) return panel;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-glass">
      <div className="w-full max-w-[400px]">{panel}</div>
    </div>
  );
}

export const LoginModal = Object.assign(LoginModalRoot, { SelectedProduct });
