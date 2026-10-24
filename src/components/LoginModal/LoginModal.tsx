"use client";

import { X } from "lucide-react";
import { useId, type FormEvent } from "react";
import { plansEn } from "@/content/plans";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { ProductCard } from "../ProductCard/ProductCard";
import { SsoButtonGroup, type SsoProvider } from "../SsoButton/SsoButton";
import { TextInput } from "../TextInput/TextInput";
import type { Plan } from "../_shared/plans";

/** Every visible and accessible string of LoginModal. */
export interface LoginModalLabels {
  /** Heading. */
  title: string;
  /** Accessible name of the close (X) button. */
  close: string;
  /** E-mail field placeholder and accessible name. */
  email: string;
  /** E-mail placeholder in the focus state. */
  emailFocus: string;
  /** Sample address filled in the disabled state. */
  sampleEmail: string;
  /** Password field placeholder and accessible name. */
  password: string;
  /** "Stay logged in" checkbox label. */
  remember: string;
  /** Forgot-password link. */
  forgot: string;
  /** Cancel button. */
  cancel: string;
  /** Submit button. */
  submit: string;
  /** Divider text above the SSO buttons. */
  sso: string;
  /** Institute login button. */
  institution: string;
  /** Prompt before the sign-up link. */
  noAccount: string;
  /** Sign-up link. */
  register: string;
}

// "login | 1440px" screen + production strings. "Stay logged in" has no English source yet (production has no
// remember-me string). German (the LoginModal master as it shipped): loginModalDe in src/i18n/de.ts.
export const loginModalLabels: LoginModalLabels = {
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
};

export interface LoginModalSelectedProductProps {
  /** Master axis visible[on,off] (e1bc9d53d909d53f). */
  visible?: boolean;
  /**
   * Plan shown in the ProductCard. Content; English default plansEn.monthly, pass plansDe.* on DE screens
   * (src/content/plans.ts).
   */
  product?: Plan;
  /** ProductCard's change-product link click. */
  onChangeProduct?: () => void;
  /** ProductCard's change link. Label text; English default "< Change plan", pass German on DE screens (productCardDe.changeLabel). */
  changeLabel?: string;
}

/** Checkout-only slot: the product the user is about to buy (a ProductCard at 352px). */
function SelectedProduct({ visible = true, product = plansEn.monthly, onChangeProduct, changeLabel }: LoginModalSelectedProductProps) {
  if (!visible) return null;
  return <ProductCard product={product} changeLabel={changeLabel} onChangeProduct={onChangeProduct ?? (() => {})} />;
}

// Axes mirror the LoginModal master (3981f9f72f51ef72): type[login] × state[default,focus,disabled].
export type LoginModalState = "default" | "focus" | "disabled";

export interface LoginModalProps {
  /** Master axis type[login]; "login" is the only value and the component does not read it. */
  type?: "login";
  /** focus pins the e-mail field's focus look; disabled is the locked, reduced form. */
  state?: LoginModalState;
  /** Checkout only: shows LoginModal.SelectedProduct above the form. */
  selectedProduct?: LoginModalSelectedProductProps;
  /** Wrap the panel in a fixed, blurred scrim. */
  overlay?: boolean;
  /**
   * Label text, merged over the English defaults (loginModalLabels); pass German on DE screens (loginModalDe).
   */
  labels?: Partial<LoginModalLabels>;
  /** Heading text; overrides labels.title (English default "Login"). */
  title?: string;
  /** Close (X) and Cancel button click. */
  onClose?: () => void;
  /** Form submit with e-mail, password and the "Stay logged in" checkbox; the native submit is prevented. */
  onSubmit?: (values: { email: string; password: string; remember: boolean }) => void;
  /** Forgot-password link click (not shown when disabled). */
  onForgotPassword?: () => void;
  /** Called with the clicked SSO provider (not shown when disabled). */
  onSso?: (provider: SsoProvider) => void;
  /** Institute login button click (not shown when disabled). */
  onInstitutionLogin?: () => void;
  /** Sign-up link click at the bottom. */
  onRegister?: () => void;
  /** Extra classes for the dialog panel (layout/spacing only; don't override colours). */
  className?: string;
}

const textLink =
  "rounded-sm text-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-white";

/**
 * Login dialog (LoginModal master): title and close, e-mail, password, "Stay logged in", forgot password,
 * Cancel / Login, SSO providers, institute login and the sign-up link. All copy comes from `labels` (English defaults).
 * LoginModal.SelectedProduct is the checkout product slot (also set via `selectedProduct`).
 * Use for: logging in on top of an existing page (`overlay` adds the fixed blurred scrim).
 * Not for: the full-page login/signup screen (use AuthForm).
 */
function LoginModalRoot({
  state = "default",
  selectedProduct,
  overlay = false,
  labels,
  title,
  onClose,
  onSubmit,
  onForgotPassword,
  onSso,
  onInstitutionLogin,
  onRegister,
  className,
}: LoginModalProps) {
  const t = { ...loginModalLabels, ...labels };
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

      {selectedProduct && <SelectedProduct {...selectedProduct} />}

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
