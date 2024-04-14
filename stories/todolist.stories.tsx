import type { Meta, StoryObj } from "@storybook/react";

import TodoList from "./TodoList";

const meta: Meta<typeof TodoList> = {
  title: "Exercise/TodoList",
  component: TodoList,
};

export default meta;
type Story = StoryObj<typeof TodoList>;

export const EmptyForm: Story = {};


