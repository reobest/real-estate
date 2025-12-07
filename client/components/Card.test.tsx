import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";

// ✅ Mock Next.js components that Jest can’t render
jest.mock("next/image", () => (props: any) => (
  <img {...props} alt={props.alt || "mocked-image"} />
));
jest.mock("next/link", () => ({ children, href }: any) => (
  <a href={href}>{children}</a>
));

describe("Card component", () => {
  const mockProperty = {
    name: "Modern Apartment",
    photoUrls: ["/img1.jpg"],
    isPetsAllowed: true,
    isParkingIncluded: false,
    averageRating: 4.5,
    numberOfReviews: 20,
    pricePerMonth: 1200,
    beds: 2,
    baths: 1,
    squareFeet: 850,
    location: {
      address: "123 Main St",
      city: "Zurich",
    },
  };

  it("renders property details correctly", () => {
    render(
      <Card
        property={mockProperty}
        isFavorite={false}
        onFavoriteToggle={jest.fn()}
        showFavoriteButton={true}
      />
    );

    expect(screen.getByText("Modern Apartment")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, Zurich")).toBeInTheDocument();
    expect(screen.getByText("$1200")).toBeInTheDocument();
    expect(screen.getByText("(20 Reviews)")).toBeInTheDocument();
    expect(screen.getByText("2 Bed")).toBeInTheDocument();
    expect(screen.getByText("1 Bath")).toBeInTheDocument();
    expect(screen.getByText("850 sq ft")).toBeInTheDocument();
  });

  it("shows 'Pets Allowed' badge when applicable", () => {
    render(
      <Card
        property={{ ...mockProperty, isPetsAllowed: true }}
        isFavorite={false}
        onFavoriteToggle={jest.fn()}
      />
    );
    expect(screen.getByText("Pets Allowed")).toBeInTheDocument();
  });

  it("calls onFavoriteToggle when heart icon is clicked", () => {
    const handleFavorite = jest.fn();

    render(
      <Card
        property={mockProperty}
        isFavorite={false}
        onFavoriteToggle={handleFavorite}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleFavorite).toHaveBeenCalledTimes(1);
  });

  it("renders filled heart when favorite", () => {
    render(
      <Card
        property={mockProperty}
        isFavorite={true}
        onFavoriteToggle={jest.fn()}
      />
    );
    const heart = screen.getByRole("button").querySelector("svg");
    expect(heart?.className).toContain("text-red-500");
  });

  it("renders property name as a link if propertyLink is provided", () => {
    render(
      <Card
        property={mockProperty}
        isFavorite={false}
        onFavoriteToggle={jest.fn()}
        propertyLink="/property/1"
      />
    );
    const link = screen.getByRole("link", { name: "Modern Apartment" });
    expect(link).toHaveAttribute("href", "/property/1");
  });
});
