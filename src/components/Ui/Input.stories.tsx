import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Search customers…",
    className: "max-w-sm rounded-none",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "SIA ALL IN",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled field",
    defaultValue: "",
  },
};
