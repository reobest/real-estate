import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

// Mock the lucide-react icon
jest.mock("lucide-react", () => ({
  Loader2: ({ className }: { className: string }) => (
    <svg data-testid="loader-icon" className={className}></svg>
  ),
}));

describe("Loading component", () => {
  it("renders loader icon and text", () => {
    render(<Loading />);
    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("applies correct classes for layout and style", () => {
    render(<Loading />);
    const wrapper = screen.getByText("Loading...").parentElement!;
    expect(wrapper).toHaveClass("fixed", "inset-0", "flex", "items-center", "justify-center");
  });

  it("applies animation and color classes to the loader icon", () => {
    render(<Loading />);
    const icon = screen.getByTestId("loader-icon");
    expect(icon).toHaveClass("animate-spin", "text-primary-700");
  });

  it("is visually accessible (contains text for screen readers)", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
