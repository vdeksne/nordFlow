import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CustomerPortfolioSection } from "./CustomerPortfolioSection";
import { customers } from "@/lib/crm/mock-data";

const meta = {
  title: "CRM/CustomerPortfolioSection",
  component: CustomerPortfolioSection,
  tags: ["autodocs"],
  args: {
    rows: customers,
    scrollMaxHeightClass: "max-h-[320px]",
  },
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/customers" },
    },
  },
  decorators: [
    (Story) => (
      <div className="box-border w-full max-w-[1400px] px-6 py-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomerPortfolioSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TableWithFullscreenRows: Story = {};
