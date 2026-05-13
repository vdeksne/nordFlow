"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button, buttonVariants } from "./Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";
import { cn } from "@/lib/utils";

const meta = {
  title: "UI/Sheet",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromLeft: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        Open sheet
      </SheetTrigger>
      <SheetContent side="left" className="border-sidebar-border w-[320px]">
        <SheetHeader>
          <SheetTitle>Panel</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Slide-over pattern shared with mobile navigation.
          </SheetDescription>
        </SheetHeader>
        <div className="text-muted-foreground flex flex-1 flex-col gap-3 p-4 text-sm">
          <p>Stack filters, deal detail, or audit trails here.</p>
        </div>
        <SheetFooter className="border-sidebar-border border-t">
          <SheetClose
            render={<Button variant="secondary" className="w-full sm:w-auto" />}
          >
            Close
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
