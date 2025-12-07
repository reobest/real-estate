import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SettingsForm from "./SettingsForm";

// ✅ Mock react-hook-form and zod setup
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(() => ({
    handleSubmit: (fn: any) => (e: any) => fn(e),
    reset: jest.fn(),
    register: jest.fn(),
    formState: { errors: {} },
  })),
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn(),
}));

// ✅ Mock form wrapper and fields
jest.mock("@/components/ui/form", () => ({
  Form: ({ children }: any) => <div data-testid="form-wrapper">{children}</div>,
}));

jest.mock("./FormField", () => ({
  CustomFormField: ({ name, label, disabled }: any) => (
    <div data-testid={`field-${name}`}>
      <label>{label}</label>
      <input
        aria-label={label}
        disabled={disabled}
        defaultValue=""
        onChange={() => {}}
      />
    </div>
  ),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("SettingsForm", () => {
  const mockOnSubmit = jest.fn();
  const initialData = {
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "123456789",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form title based on userType", () => {
    render(
      <SettingsForm
        initialData={initialData}
        onSubmit={mockOnSubmit}
        userType="manager"
      />
    );

    expect(screen.getByText("Manager Settings")).toBeInTheDocument();
    expect(
      screen.getByText(/Manage your account preferences/i)
    ).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(
      <SettingsForm
        initialData={initialData}
        onSubmit={mockOnSubmit}
        userType="tenant"
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  it("shows Save Changes button when in edit mode", () => {
    render(
      <SettingsForm
        initialData={initialData}
        onSubmit={mockOnSubmit}
        userType="manager"
      />
    );

    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("toggles edit mode when Cancel/Edit is clicked", () => {
    const mockReset = jest.fn();
    (require("react-hook-form").useForm as jest.Mock).mockReturnValueOnce({
      handleSubmit: (fn: any) => (e: any) => fn(e),
      reset: mockReset,
      formState: { errors: {} },
    });

    render(
      <SettingsForm
        initialData={initialData}
        onSubmit={mockOnSubmit}
        userType="tenant"
      />
    );

    const toggleBtn = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(toggleBtn);
    expect(mockReset).toHaveBeenCalledWith(initialData);
  });

  it("calls onSubmit with form data when submitted", async () => {
    render(
      <SettingsForm
        initialData={initialData}
        onSubmit={mockOnSubmit}
        userType="manager"
      />
    );

    const saveBtn = screen.getByRole("button", { name: /Save Changes/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
