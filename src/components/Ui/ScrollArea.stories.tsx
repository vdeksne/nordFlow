import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ScrollArea } from "./ScrollArea";

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-sidebar-border w-full max-w-sm rounded-none border border-white/[0.08] p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LongList: Story = {
  render: () => (
    <ScrollArea className="h-48 rounded-none border border-white/[0.08]">
      <ul className="p-3 text-sm">
        {Array.from({ length: 24 }, (_, i) => (
          <li
            key={i}
            className="text-muted-foreground border-sidebar-border border-b border-white/[0.05] py-2 last:border-0"
          >
            Scroll row {i + 1}
          </li>
        ))}
      </ul>
    </ScrollArea>
  ),
};
