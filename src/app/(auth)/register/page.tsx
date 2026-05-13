import type { Metadata } from "next";

import { AuthMarketingPanel } from "@/components/auth/auth-marketing-panel";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Nordflow CRM · demo registration shell (no backend).",
};

export default function RegisterPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(280px,1fr)_minmax(0,460px)] xl:grid-cols-[1fr_minmax(0,480px)]">
      <AuthMarketingPanel variant="register" />
      <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:py-16 xl:px-14">
        <RegisterForm />
      </div>
    </div>
  );
}
