import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom text-* sizes so `text-label text-white` keeps both classes.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-hero",
        "display-section",
        "display-section-mobile",
        "heading-section",
        "heading-plan",
        "button-cta",
        "button-sm",
        "label",
        "nav-tab",
        "nav-action",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
