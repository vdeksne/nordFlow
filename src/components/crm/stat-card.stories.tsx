import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Gauge, Users } from "lucide-react";

import { StatCard } from "./stat-card";

const meta = {
  title: "CRM/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  argTypes: {
    icon: { control: false },
  },
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <StatCard {...args} icon={Users} />,
  args: {
    title: "Active accounts",
    value: "128",
    hint: "Across EU growth pods.",
    trend: { label: "+12% vs last quarter", positive: true },
  },
};

export const NegativeTrend: Story = {
  render: (args) => <StatCard {...args} icon={Gauge} />,
  args: {
    title: "Velocity",
    value: "−4%",
    hint: "Vs prior sprint.",
    trend: { label: "Below target cohort", positive: false },
  },
};
