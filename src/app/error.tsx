"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { ErrorScreen } from "@/screens/StatusScreens";

export default function ErrorPage({ error }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <ErrorScreen />;
}
