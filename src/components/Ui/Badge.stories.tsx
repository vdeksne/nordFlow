import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Qualified",
    variant: "default" as const,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Contacted" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "New" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Lost" },
};
