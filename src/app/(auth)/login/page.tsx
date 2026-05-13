import type { Metadata } from "next";

import { AuthMarketingPanel } from "@/components/Auth/AuthMarketingPanel";
import { LoginForm } from "@/components/Auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "NordFlow CRM · demo login shell (no backend).",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] xl:grid-cols-[1.05fr_minmax(380px,440px)]">
      <AuthMarketingPanel variant="login" />
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:min-h-dvh lg:px-14 lg:py-12 xl:px-20">
        <LoginForm />
      </div>
    </div>
  );
}
