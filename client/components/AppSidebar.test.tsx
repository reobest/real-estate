import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppSidebar from "./AppSidebar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock sidebar context
jest.mock("@/components/ui/sidebar", () => ({
  Sidebar: ({ children }: any) => <div data-testid="sidebar">{children}</div>,
  SidebarHeader: ({ children }: any) => <div>{children}</div>,
  SidebarContent: ({ children }: any) => <div>{children}</div>,
  SidebarMenu: ({ children }: any) => <div>{children}</div>,
  SidebarMenuItem: ({ children }: any) => <div>{children}</div>,
  SidebarMenuButton: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  useSidebar: jest.fn(() => ({
    open: true,
    toggleSidebar: jest.fn(),
  })),
}));

// Mock icons (lucide-react)
jest.mock("lucide-react", () => ({
  Building: () => <svg data-testid="icon-building" />,
  FileText: () => <svg data-testid="icon-filetext" />,
  Heart: () => <svg data-testid="icon-heart" />,
  Home: () => <svg data-testid="icon-home" />,
  Settings: () => <svg data-testid="icon-settings" />,
  Menu: () => <svg data-testid="icon-menu" />,
  X: () => <svg data-testid="icon-x" />,
}));

// Mock next/link
jest.mock("next/link", () => ({ children, href }: any) => (
  <a href={href} data-testid={`link-${href}`}>
    {children}
  </a>
));

const mockUsePathname = require("next/navigation").usePathname as jest.Mock;

describe("AppSidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'Manager View' title for manager", () => {
    mockUsePathname.mockReturnValue("/managers/properties");

    render(<AppSidebar userType="manager" />);
    expect(screen.getByText("Manager View")).toBeInTheDocument();
  });

  it("renders 'Renter View' title for tenant", () => {
    mockUsePathname.mockReturnValue("/tenants/favorites");

    render(<AppSidebar userType="tenant" />);
    expect(screen.getByText("Renter View")).toBeInTheDocument();
  });

  it("renders manager navigation links", () => {
    mockUsePathname.mockReturnValue("/managers/properties");

    render(<AppSidebar userType="manager" />);

    expect(screen.getByText("Properties")).toBeInTheDocument();
    expect(screen.getByText("Applications")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders tenant navigation links", () => {
    mockUsePathname.mockReturnValue("/tenants/favorites");

    render(<AppSidebar userType="tenant" />);

    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Applications")).toBeInTheDocument();
    expect(screen.getByText("Residences")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders active link with correct styling", () => {
    mockUsePathname.mockReturnValue("/managers/properties");

    render(<AppSidebar userType="manager" />);
    const activeLink = screen.getByText("Properties");
    expect(activeLink.className).toMatch(/text-blue-600/);
  });

  it("toggles sidebar open/close icons", () => {
    const mockToggle = jest.fn();
    const useSidebar = require("@/components/ui/sidebar").useSidebar;
    useSidebar.mockReturnValue({ open: false, toggleSidebar: mockToggle });

    render(<AppSidebar userType="manager" />);
    const toggleBtn = screen.getByRole("button");
    fireEvent.click(toggleBtn);
    expect(mockToggle).toHaveBeenCalled();
  });
});
