import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

function PipelineDealPreview() {
  return (
    <Card className="border-sidebar-border w-full max-w-md shadow-none">
      <CardHeader>
        <CardTitle>Negotiation</CardTitle>
        <CardDescription>Legal & pricing · Wave Payments</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm leading-relaxed">
        Probability-adjusted pipeline spotlight card, similar structure to the
        Pipeline view.
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          Details
        </Button>
        <Button size="sm">Next stage</Button>
      </CardFooter>
    </Card>
  );
}

const meta = {
  title: "UI/Card",
  component: PipelineDealPreview,
  tags: ["autodocs"],
} satisfies Meta<typeof PipelineDealPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PipelineExample: Story = {
  render: () => <PipelineDealPreview />,
};
