"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./tabs";

function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-lg gap-4">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground">
        Context cards and KPIs, similar to the top section of the Dashboard.
      </TabsContent>
      <TabsContent value="activity" className="text-muted-foreground">
        Event stream placeholder (Supabase sync).
      </TabsContent>
      <TabsContent value="billing" className="text-muted-foreground">
        Fee EUR and invoice breakdown from the customer portfolio.
      </TabsContent>
    </Tabs>
  );
}

const meta = {
  title: "UI/Tabs",
  component: TabsDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof TabsDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LineVariant: Story = {
  render: () => <TabsDemo />,
};
