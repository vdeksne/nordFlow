"use client";

import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CustomerDetailFullscreen } from "./customer-detail-fullscreen";
import { Button } from "@/components/ui/button";
import { customers } from "@/lib/crm/mock-data";

function DetailInteractiveDemo() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const row = customers[index] ?? customers[0] ?? null;

  return (
    <div className="space-y-6 p-4">
      <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
        Fullscreen portfolio detail (same overlay as Customers). Use Escape or
        backdrop to close.
      </p>
      <div className="flex flex-wrap gap-3">
        {customers.map((c, i) => (
          <Button
            key={c.id}
            type="button"
            variant={i === index ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            {c.companyName ?? c.id}
          </Button>
        ))}
      </div>
      <CustomerDetailFullscreen
        customer={row}
        open={open && !!row}
        onOpenChange={setOpen}
      />
    </div>
  );
}

const meta = {
  title: "CRM/CustomerDetailFullscreen",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/customers" },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => <DetailInteractiveDemo />,
};
