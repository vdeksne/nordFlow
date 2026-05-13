import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AppSidebar } from "./AppSidebar";

const meta = {
  title: "CRM/AppSidebar",
  component: AppSidebar,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="border-sidebar-border bg-sidebar h-[560px] w-[260px] overflow-hidden rounded-none border border-white/[0.06] shadow-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DashboardActive: Story = {};

export const PipelineActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/pipeline",
      },
    },
  },
};
