import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "./avatar";

function AvatarShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-6">
        <Avatar size="sm">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-accent text-foreground text-xs font-semibold">
            VK
          </AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      </div>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback className="text-[10px]">AA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+4</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}

const meta = {
  title: "UI/Avatar",
  component: AvatarShowcase,
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SizesAndGroup: Story = {
  render: () => <AvatarShowcase />,
};
