import type { Metadata } from "next";

import { AuthMarketingPanel } from "@/components/auth/auth-marketing-panel";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Nordflow CRM · demo login shell (no backend).",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(280px,1fr)_minmax(0,460px)] xl:grid-cols-[1fr_minmax(0,480px)]">
      <AuthMarketingPanel variant="login" />
      <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:py-16 xl:px-14">
        <LoginForm />
      </div>
    </div>
  );
}
