import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PipelineBoard } from "./PipelineBoard";
import { deals } from "@/lib/crm/mock-data";

const meta = {
  title: "CRM/PipelineBoard",
  component: PipelineBoard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/pipeline" },
    },
  },
  decorators: [
    (Story) => (
      <div className="box-border min-h-screen w-full overflow-auto px-6 py-10 sm:px-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PipelineBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SubsetDeals: Story = {
  args: {
    deals: deals.filter((d) => d.stage !== "won"),
  },
};
