import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CallToAction from "./CallToAction";

// Mock next/image to avoid layout issues in Jest
jest.mock("next/image", () => (props: any) => (
  <img data-testid="next-image" {...props} alt={props.alt} />
));

// Mock next/link
jest.mock("next/link", () => ({ children, href }: any) => (
  <a href={href} data-testid="next-link">
    {children}
  </a>
));

describe("CallToAction component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading and subheading correctly", () => {
    render(<CallToAction />);
    expect(
      screen.getByText(/Find your drem rental property/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Discover a wide range of rental properties/i)
    ).toBeInTheDocument();
  });

  it("renders background image and overlay", () => {
    render(<CallToAction />);
    expect(screen.getByTestId("next-image")).toBeInTheDocument();
    const overlay = screen.getByRole("presentation", { hidden: true }) || screen.getByText(/Find your/i).previousSibling;
    expect(overlay).toBeTruthy();
  });

  it("renders Search and Sign Up buttons", () => {
    render(<CallToAction />);
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  it("links direct to /search and /signup", () => {
    render(<CallToAction />);
    const links = screen.getAllByTestId("next-link");
    expect(links[0]).toHaveAttribute("href", "/search");
    expect(links[1]).toHaveAttribute("href", "/signup");
  });

  it("scrolls to top smoothly when Search is clicked", () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(window, "scrollTo", { value: mockScrollTo });

    render(<CallToAction />);
    const searchBtn = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(searchBtn);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("applies correct Tailwind classes for layout", () => {
    render(<CallToAction />);
    const container = screen.getByText(/Find your drem rental property/i).parentElement!;
    expect(container.className).toContain("relative");
    expect(container.className).toContain("flex");
    expect(container.className).toContain("items-center");
  });
});
