import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CustomerPortfolioTable } from "./customer-portfolio-table";
import { customers } from "@/lib/crm/mock-data";

const meta = {
  title: "CRM/CustomerPortfolioTable",
  component: CustomerPortfolioTable,
  tags: ["autodocs"],
  args: {
    rows: customers,
    scrollMaxHeightClass: "max-h-[380px]",
  },
} satisfies Meta<typeof CustomerPortfolioTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromTemplateRows: Story = {};
