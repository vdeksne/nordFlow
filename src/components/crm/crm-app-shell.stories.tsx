import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AppSidebar } from "./app-sidebar";
import { TopBar } from "./top-bar";

const meta = {
  title: "CRM/App shell preview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/dashboard" },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SidebarAndTopBar: Story = {
  render: () => (
    <div className="border-sidebar-border flex min-h-[560px] w-full max-w-6xl overflow-hidden rounded-xl border border-white/[0.08] shadow-xl">
      <div className="border-sidebar-border bg-sidebar w-[260px] shrink-0 border-r">
        <AppSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col bg-background">
        <TopBar
          title="Dashboard"
          subtitle="Composite preview, sidebar navigation + header chrome."
        />
        <div className="text-muted-foreground flex flex-1 items-center justify-center p-8 text-sm">
          Route content area
        </div>
      </div>
    </div>
  ),
};
