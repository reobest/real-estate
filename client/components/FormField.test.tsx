import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormField } from "./FormField";

// ✅ Mocks for UI components
jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => (
    <input data-testid="input" {...props} onChange={(e) => props?.onChange?.(e.target.value)} />
  ),
}));

jest.mock("@/components/ui/textarea", () => ({
  Textarea: (props: any) => <textarea data-testid="textarea" {...props} />,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/select", () => ({
  Select: ({ children, onValueChange, value }: any) => (
    <div data-testid="select">
      <select
        data-testid="native-select"
        onChange={(e) => onValueChange(e.target.value)}
        value={value}
      >
        {children}
      </select>
    </div>
  ),
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ value, children }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: any) => <>{children}</>,
  SelectValue: ({ placeholder }: any) => <>{placeholder}</>,
}));

jest.mock("@/components/ui/switch", () => ({
  Switch: ({ checked, onCheckedChange, id }: any) => (
    <input
      data-testid="switch"
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  ),
}));

jest.mock("@/components/ui/form", () => ({
  FormControl: ({ children }: any) => <>{children}</>,
  FormField: ({ render }: any) => render({ field: { onChange: jest.fn(), value: "" } }),
  FormItem: ({ children }: any) => <div data-testid="form-item">{children}</div>,
  FormLabel: ({ children }: any) => <label>{children}</label>,
  FormMessage: ({ children }: any) => <span>{children}</span>,
}));

jest.mock("filepond", () => ({
  FilePond: () => <div data-testid="filepond">FilePond</div>,
}));
jest.mock("filepond-plugin-image-preview", () => ({}));
jest.mock("filepond-plugin-image-exif-orientation", () => ({}));

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("CustomFormField", () => {
  it("renders a text input by default", () => {
    render(
      <Wrapper>
        <CustomFormField name="name" label="Name" placeholder="Enter name" />
      </Wrapper>
    );
    expect(screen.getByTestId("input")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders a textarea when type='textarea'", () => {
    render(
      <Wrapper>
        <CustomFormField name="bio" label="Bio" type="textarea" />
      </Wrapper>
    );
    expect(screen.getByTestId("textarea")).toBeInTheDocument();
  });

  it("renders a select field with options", () => {
    render(
      <Wrapper>
        <CustomFormField
          name="role"
          label="Role"
          type="select"
          options={[
            { value: "manager", label: "Manager" },
            { value: "tenant", label: "Tenant" },
          ]}
          placeholder="Select role"
        />
      </Wrapper>
    );

    const select = screen.getByTestId("native-select");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("Manager")).toBeInTheDocument();
    fireEvent.change(select, { target: { value: "tenant" } });
    expect(select.value).toBe("tenant");
  });

  it("renders a switch toggle when type='switch'", () => {
    render(
      <Wrapper>
        <CustomFormField name="notifications" label="Notifications" type="switch" />
      </Wrapper>
    );
    const toggle = screen.getByTestId("switch");
    expect(toggle).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);
  });

  it("renders a file upload field", () => {
    render(
      <Wrapper>
        <CustomFormField name="photo" label="Photo" type="file" />
      </Wrapper>
    );
    expect(screen.getByTestId("filepond")).toBeInTheDocument();
  });

  it("renders a number input", () => {
    render(
      <Wrapper>
        <CustomFormField name="age" label="Age" type="number" />
      </Wrapper>
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "number");
  });

  it("renders and interacts with multi-input fields", () => {
    render(
      <Wrapper>
        <CustomFormField name="tags" label="Tags" type="multi-input" />
      </Wrapper>
    );
    expect(screen.getByText("Add Item")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Add Item"));
  });

  it("renders edit icon when isIcon=true", () => {
    render(
      <Wrapper>
        <CustomFormField name="editable" label="Editable" isIcon />
      </Wrapper>
    );
    expect(screen.getByText("Editable")).toBeInTheDocument();
  });

  it("respects disabled state", () => {
    render(
      <Wrapper>
        <CustomFormField name="disabled" label="Disabled" disabled />
      </Wrapper>
    );
    const input = screen.getByTestId("input");
    expect(input).toBeDisabled();
  });
});
