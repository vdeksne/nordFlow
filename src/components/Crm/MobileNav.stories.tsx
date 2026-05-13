import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MobileNav } from "./MobileNav";

const meta = {
  title: "CRM/MobileNav",
  component: MobileNav,
  tags: ["autodocs"],
  args: {
    forceVisible: true,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/customers",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="border-sidebar-border w-full max-w-md overflow-hidden rounded-none border border-white/[0.08] shadow-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MobileNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnCustomersRoute: Story = {};

export const OnTasksRoute: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/tasks",
      },
    },
  },
};
