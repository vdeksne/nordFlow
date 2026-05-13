import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TopBar } from "./top-bar";

const meta = {
  title: "CRM/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  args: {
    title: "Executive overview",
    subtitle:
      "Pulse across pipeline, klientu portfelis, leads un uzdevumi.",
  },
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NarrowTitle: Story = {
  args: {
    title: "Klientu portfelis",
    subtitle: undefined,
  },
};
