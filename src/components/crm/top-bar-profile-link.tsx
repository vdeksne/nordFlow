"use client";

import Link from "next/link";

import { useProfile } from "@/components/crm/profile-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/** Avatar in the header: tap / click opens `/profile`. */
export function TopBarProfileLink({ className }: { className?: string }) {
  const { profile } = useProfile();

  return (
    <Link
      href="/profile"
      aria-label="Edit profile"
      className={cn(
        "focus-visible:ring-primary shrink-0 rounded-full outline-none transition-opacity hover:opacity-95 active:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Avatar className="ring-primary/25 size-11 ring-2 sm:size-10">
        <AvatarFallback className="bg-accent text-foreground text-xs font-semibold">
          {profile.initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
