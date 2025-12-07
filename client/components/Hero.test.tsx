import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Hero from "./Hero";

// Mock next/image to avoid server rendering issues
jest.mock("next/image", () => (props: any) => <img {...props} alt={props.alt} />);

// Mock framer-motion to disable animations in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Next.js navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock Redux hooks
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

// Mock Redux action
jest.mock("../state", () => ({
  setFilters: jest.fn((payload) => ({ type: "SET_FILTERS", payload })),
}));

describe("Hero component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading, subheading, input, and button", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Start your journy to finding the perfect place to call home/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Explore our wide range of rental properties/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by city/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<Hero />);
    const input = screen.getByPlaceholderText(/Search by city/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Zurich" } });
    expect(input.value).toBe("Zurich");
  });

  it("does not trigger search if input is empty", async () => {
    render(<Hero />);
    const button = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(button);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("calls fetch, dispatch, and navigation on successful search", async () => {
    const mockGeoResponse = {
      features: [{ center: [8.55, 47.37] }],
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockGeoResponse) })
    ) as any;

    render(<Hero />);

    const input = screen.getByPlaceholderText(/Search by city/i);
    fireEvent.change(input, { target: { value: "Zurich" } });
    const button = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Zurich")
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_FILTERS",
        payload: {
          location: "Zurich",
          coordinates: [47.37, 8.55],
        },
      });
      expect(mockPush).toHaveBeenCalledWith(
        expect.stringMatching(/search\?location=Zurich/)
      );
    });
  });

  it("handles fetch errors gracefully", async () => {
    global.fetch = jest.fn(() => Promise.reject("API failure")) as any;
    render(<Hero />);
    const input = screen.getByPlaceholderText(/Search by city/i);
    fireEvent.change(input, { target: { value: "Bern" } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      // still no dispatch or navigation on error
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
