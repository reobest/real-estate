import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("renders title and subtitle correctly", () => {
    render(<Header title="Dashboard" subtitle="Welcome back!" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
  });

  it("applies the correct Tailwind classes", () => {
    render(<Header title="Hello" subtitle="World" />);
    const title = screen.getByText("Hello");
    const subtitle = screen.getByText("World");

    expect(title).toHaveClass("text-xl", "font-semibold");
    expect(subtitle).toHaveClass("text-sm", "text-gray-500", "mt-1");
  });
});
