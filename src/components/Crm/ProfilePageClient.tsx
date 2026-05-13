"use client";

import type { ComponentType } from "react";
import { Building2, Globe2, Mail, Phone, Shield, Sparkles } from "lucide-react";

import { useProfile } from "@/components/Crm/ProfileContext";
import { Avatar, AvatarFallback } from "@/components/Ui/Avatar";
import { cn } from "@/lib/utils";

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-none border border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_72%,transparent)] px-4 py-3 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)]">
      <div className="text-muted-foreground mt-0.5 shrink-0">
        <Icon className="size-4 opacity-85" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.14em] uppercase">
          {label}
        </p>
        <p className="text-foreground mt-1 text-sm font-medium tracking-tight">{value}</p>
      </div>
    </div>
  );
}

export function ProfilePageClient() {
  const { profile } = useProfile();

  const phoneDisplay =
    profile.phone.trim() !== ""
      ? profile.phone.trim()
      : "+371 2200 0011 (demo number)";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div
        className={cn(
          "relative overflow-hidden rounded-none border border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_78%,transparent)] p-6 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.05)] sm:p-8",
        )}
      >
        <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
          <Avatar className="ring-primary/35 size-[5.5rem] shrink-0 ring-2 sm:size-28">
            <AvatarFallback className="bg-accent text-foreground text-2xl font-semibold">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-none border border-primary/25 bg-primary/[0.10] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
              <Sparkles className="size-3.5 opacity-90" aria-hidden />
              Demo profile
            </div>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              {profile.displayName}
            </h2>
            <p className="text-muted-foreground text-sm">{profile.jobTitle}</p>
            <p className="text-muted-foreground mx-auto max-w-md pt-1 text-xs leading-relaxed sm:mx-0">
              This screen is read-only in the hackathon build. Hook auth and a user API to make it
              editable and synced across devices.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground px-0.5 text-[11px] font-semibold tracking-[0.18em] uppercase">
          Contact (demo data)
        </p>
        <div className="grid gap-2 sm:grid-cols-1">
          <DetailRow icon={Mail} label="Email" value={profile.email} />
          <DetailRow icon={Phone} label="Phone" value={phoneDisplay} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground px-0.5 text-[11px] font-semibold tracking-[0.18em] uppercase">
          Workspace (preview)
        </p>
        <div className="grid gap-2">
          <DetailRow icon={Building2} label="Organization" value="NordFlow CRM · demo tenant" />
          <DetailRow icon={Shield} label="Role" value="Administrator (mock)" />
          <DetailRow icon={Globe2} label="Region" value="Europe · demo locale" />
        </div>
      </div>
    </div>
  );
}
