import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CrmPage } from "./crm-page";

const meta = {
  title: "CRM/CrmPage",
  tags: ["autodocs"],
  args: {
    title: "Page shell",
    subtitle:
      "Augša ir vienota navigācija (TopBar); zemāk slots saturam.",
    children: (
      <div className="border-sidebar-border text-muted-foreground flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-white/[0.12] bg-muted/20 text-sm">
        Page content slot
      </div>
    ),
  },
  render: (args) => <CrmPage {...args} />,
} satisfies Meta<typeof CrmPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Shell: Story = {};
