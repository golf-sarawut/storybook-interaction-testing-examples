import type { Meta, StoryObj } from "@storybook/react";

import { userEvent, within, expect } from "@storybook/test";
import { LoginForm } from "./Loginform";

const meta: Meta<typeof LoginForm> = {
  title: "Example/LoginForm",
  component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const EmptyForm: Story = {};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId("email"), "email@provider.com");

    await userEvent.type(canvas.getByTestId("password"), "a-random-password");

    await userEvent.click(canvas.getByRole("button"));

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        "Everything is perfect. Your account is ready and we should probably get you started!"
      )
    ).toBeInTheDocument();
  },
};

export const FilledFormWithStep: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Enter email and password", async () => {
      await userEvent.type(canvas.getByTestId("email"), "email@provider.com");
      await userEvent.type(canvas.getByTestId("password"), "a-random-password");
    });

    await step("Submit form", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });

    await expect(
      canvas.getByText(
        "Everything is perfect. Your account is ready and we should probably get you started!"
      )
    ).toBeInTheDocument();
  },
};
