"use client";
import SessionWatcher from "@/utils/sessionWatcher";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <>
      <SessionProvider>
        {children}
        <SessionWatcher />
        <Toaster position="top-right" richColors expand={false} />
      </SessionProvider>
    </>
  );
}
