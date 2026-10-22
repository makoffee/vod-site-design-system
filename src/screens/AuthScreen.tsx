"use client";

import { useState } from "react";
import { AuthForm, type AuthFormMode } from "@/components/AuthForm/AuthForm";
import { SoonerLogo } from "@/components/SoonerLogo/SoonerLogo";
import { BINOCULAR_PATH, BINOCULAR_VIEWBOX } from "@/components/_shared/icons";
import type { PlanId } from "@/components/_shared/plans";

export interface AuthScreenProps {
  defaultMode?: AuthFormMode;
  /** Signup from checkout ("signup with product card"). */
  product?: PlanId;
}

/**
 * Login / signup page (design "login | 1440px", "signup | 1440px", "signup with product card | 1440px" and the 393
 * versions): the violet binocular mark fading to black behind the form, logo and tagline top left, no header or footer.
 */
export function AuthScreen({ defaultMode = "login", product }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthFormMode>(defaultMode);

  return (
    <main className="@container relative isolate min-h-screen overflow-hidden bg-black text-white">
      <svg
        viewBox={`0 0 ${BINOCULAR_VIEWBOX.width} ${BINOCULAR_VIEWBOX.height}`}
        aria-hidden
        className="absolute top-[18%] left-[-30%] -z-10 w-[190%] max-w-none -rotate-[14deg] @4xl:top-[3%] @4xl:left-[3%] @4xl:w-[93%] @4xl:-rotate-[10deg]"
      >
        <defs>
          <linearGradient id="auth-mark" x1="0.75" y1="0" x2="0.45" y2="1">
            <stop offset="0" stopColor="var(--color-sooner-primary)" />
            <stop offset="0.5" stopColor="var(--color-sooner-primary)" stopOpacity="0.6" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={BINOCULAR_PATH} fill="url(#auth-mark)" />
      </svg>

      <div className="mx-auto grid min-h-screen max-w-[1440px] gap-10 px-6 py-12 @4xl:grid-cols-2 @4xl:px-24 @4xl:py-24">
        <div className="flex flex-col gap-4">
          <SoonerLogo className="h-[50px] w-auto self-start text-sooner-primary" />
          <p className="m-0 text-[22px] leading-[1.5] font-semibold">Curated Cinema</p>
        </div>
        <div className="flex justify-center @4xl:justify-start @4xl:pt-12">
          <AuthForm
            mode={mode}
            product={mode === "signup" ? product : undefined}
            onChangeProduct={() => {}}
            locale="de"
            onSwitchMode={() => setMode(mode === "login" ? "signup" : "login")}
            className="max-w-[400px]"
          />
        </div>
      </div>
    </main>
  );
}
