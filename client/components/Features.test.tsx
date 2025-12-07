// components/Features.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Features from "./Features";

// Mock constants used in Features.tsx
jest.mock("../lib/constants", () => ({
  headingArray: ["Find Homes", "Filter Easily", "Save Favorites"],
  DescriptionArray: [
    "Search across thousands of listings.",
    "Use filters to narrow your choices.",
    "Save properties to view later.",
  ],
  buttonArray: ["search", "filters", "favorites"],
}));

// Mock Next.js components
jest.mock("next/image", () => (props: any) => <img {...props} alt={props.alt} />);
jest.mock("next/link", () => ({ children, href }: any) => <a href={href}>{children}</a>);

describe("Features component", () => {
  it("renders the main heading text", () => {
    render(<Features />);
    expect(
      screen.getByText(
        "Quickly find the home you want using our effective search filters"
      )
    ).toBeInTheDocument();
  });

  it("renders three feature cards", () => {
    render(<Features />);
    const images = screen.getAllByAltText("features-image");
    expect(images).toHaveLength(3);
  });

  it("renders correct headings and descriptions for each card", () => {
    render(<Features />);
    expect(screen.getByText("Find Homes")).toBeInTheDocument();
    expect(screen.getByText("Filter Easily")).toBeInTheDocument();
    expect(screen.getByText("Save Favorites")).toBeInTheDocument();

    expect(
      screen.getByText("Search across thousands of listings.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Use filters to narrow your choices.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Save properties to view later.")
    ).toBeInTheDocument();
  });

  it("renders buttons with correct text and links", () => {
    render(<Features />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);

    expect(screen.getByText("search")).toBeInTheDocument();
    expect(screen.getByText("filters")).toBeInTheDocument();
    expect(screen.getByText("favorites")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/search");
    expect(links[1]).toHaveAttribute("href", "/filters");
    expect(links[2]).toHaveAttribute("href", "/favorites");
  });

  it("renders correct image sources", () => {
    render(<Features />);
    const imgs = screen.getAllByAltText("features-image");
    expect(imgs[0]).toHaveAttribute("src", "/landing-search1.png");
    expect(imgs[1]).toHaveAttribute("src", "/landing-search2.png");
    expect(imgs[2]).toHaveAttribute("src", "/landing-search3.png");
  });
});
