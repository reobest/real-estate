import React from "react";
import { render, screen } from "@testing-library/react";
import Discover from "./Discover";

// Mock next/image since Jest doesn't support Next.js Image optimization
jest.mock("next/image", () => (props: any) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt || "mocked"} />;
});

describe("Discover component", () => {
  it("renders main heading and subheading", () => {
    render(<Discover />);
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(
      screen.getByText("Find Your Dream rental property today")
    ).toBeInTheDocument();
  });

  it("renders the descriptive paragraph", () => {
    render(<Discover />);
    expect(
      screen.getByText(/Seraching for your dream prperty has never been esear/i)
    ).toBeInTheDocument();
  });

  it("renders three discover cards", () => {
    render(<Discover />);
    const cards = screen.getAllByRole("img");
    expect(cards).toHaveLength(3);
  });

  it("renders correct headings and descriptions for each card", () => {
    render(<Discover />);

    const headings = [
      "Search for properties",
      "Book your rental",
      "Enjoy your new home",
    ];

    const descriptions = [
      /Browse through our extensive collection/i,
      /once you have found the perfect property/i,
      /Move into your new rental property/i,
    ];

    headings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });

    descriptions.forEach((desc) => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  it("renders images with correct sources", () => {
    render(<Discover />);
    const images = screen.getAllByAltText("discover-image");
    expect(images[0]).toHaveAttribute("src", "/landing-icon1.png");
    expect(images[1]).toHaveAttribute("src", "/landing-icon2.png");
    expect(images[2]).toHaveAttribute("src", "/landing-icon3.png");
  });
});
