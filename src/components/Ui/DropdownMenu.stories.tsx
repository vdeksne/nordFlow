"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronDownIcon } from "lucide-react";

import { buttonVariants } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { cn } from "@/lib/utils";

const meta = {
  title: "UI/DropdownMenu",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
      >
        Record actions
        <ChevronDownIcon className="size-4 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[12rem]" align="start">
        <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
          Deal
        </DropdownMenuLabel>
        <DropdownMenuItem>Edit stage</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
