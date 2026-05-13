import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Separator } from "./Separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-sidebar-border w-full max-w-md rounded-none border border-white/[0.08] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="space-4">
      <p className="text-sm">Section A</p>
      <Separator />
      <p className="text-sm">Section B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-24 items-stretch gap-4">
      <span className="text-muted-foreground flex flex-1 items-center justify-center text-xs">
        Left
      </span>
      <Separator orientation="vertical" />
      <span className="text-muted-foreground flex flex-1 items-center justify-center text-xs">
        Right
      </span>
    </div>
  ),
};
