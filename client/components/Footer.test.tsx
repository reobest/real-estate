import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Mock all icon components from react-icons
jest.mock("react-icons/fa", () => ({
  FaFacebook: () => <svg data-testid="icon-facebook" />,
  FaTwitter: () => <svg data-testid="icon-twitter" />,
  FaLinkedin: () => <svg data-testid="icon-linkedin" />,
  FaYoutube: () => <svg data-testid="icon-youtube" />,
}));
jest.mock("react-icons/ai", () => ({
  AiFillInstagram: () => <svg data-testid="icon-instagram" />,
}));

describe("Footer component", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("BASECLUB")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Footer />);
    const navLinks = [
      "About us",
      "Contact us",
      "FaQ",
      "Terms",
      "Privacy",
    ];
    navLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("renders all social media icons", () => {
    render(<Footer />);
    expect(screen.getByTestId("icon-facebook")).toBeInTheDocument();
    expect(screen.getByTestId("icon-instagram")).toBeInTheDocument();
    expect(screen.getByTestId("icon-twitter")).toBeInTheDocument();
    expect(screen.getByTestId("icon-linkedin")).toBeInTheDocument();
    expect(screen.getByTestId("icon-youtube")).toBeInTheDocument();
  });

  it("renders the copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        /@all rights reserved Privacy Policy Terms of use Cookie Policy/i
      )
    ).toBeInTheDocument();
  });
});
