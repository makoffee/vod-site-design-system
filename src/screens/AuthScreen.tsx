"use client";

import Image from "next/image";
import { useState } from "react";
import { AuthForm, type AuthFormMode } from "@/components/AuthForm/AuthForm";
import { SoonerLogo } from "@/components/SoonerLogo/SoonerLogo";
import type { PlanId } from "@/components/_shared/plans";
import { plansDe, plansEn } from "@/content/plans";
import type { Locale } from "@/i18n/locale";
import { authFormDe } from "@/i18n/de";

export interface AuthScreenProps {
  defaultMode?: AuthFormMode;
  /** Signup from checkout ("signup with product card"). */
  product?: PlanId;
  /** Screen language: English (default, Storybook) or German (the /login and /signup routes). */
  locale?: Locale;
}

/**
 * Login / signup page (login, signup, and signup with a chosen plan; desktop and mobile): the violet brand glow behind the form, logo and tagline top left, no header or footer.
 */
export function AuthScreen({ defaultMode = "login", product, locale = "en" }: AuthScreenProps) {
  const de = locale === "de";
  const [mode, setMode] = useState<AuthFormMode>(defaultMode);

  return (
    <main className="@container relative isolate min-h-screen overflow-hidden bg-black text-white">
      {/* Brand glow, top-anchored like the designs so the logo sits on black: full width on desktop, a 312% crop on mobile. */}
      <Image
        src="/images/brand/auth-glow.jpg"
        alt=""
        width={1718}
        height={1190}
        priority
        className="absolute top-0 left-[-56%] -z-10 w-[312.5%] max-w-none @4xl:left-0 @4xl:w-full"
      />

      <div className="mx-auto grid min-h-screen max-w-[1440px] gap-10 px-6 py-12 @4xl:grid-cols-2 @4xl:px-24 @4xl:py-24">
        <div className="flex flex-col gap-4">
          <SoonerLogo className="h-[50px] w-auto self-start text-sooner-primary" />
          <p className="m-0 text-[22px] leading-[1.5] font-semibold">Curated Cinema</p>
        </div>
        <div className="flex justify-center @4xl:justify-start @4xl:pt-12">
          <AuthForm
            mode={mode}
            product={mode === "signup" && product ? (de ? plansDe : plansEn)[product] : undefined}
            onChangeProduct={() => {}}
            labels={de ? authFormDe : undefined}
            onSwitchMode={() => setMode(mode === "login" ? "signup" : "login")}
            className="max-w-[400px]"
          />
        </div>
      </div>
    </main>
  );
}
