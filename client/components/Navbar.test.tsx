// src/setupTests.ts
import "@testing-library/jest-dom";

jest.mock("next/image", () => (props: any) => <img {...props} alt={props.alt || "mocked"} />);
jest.mock("next/link", () => ({ children, href }: any) => <a href={href}>{children}</a>);

// Mock Next.js router hooks
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

// Mock AWS Amplify signOut
jest.mock("aws-amplify/auth", () => ({
  signOut: jest.fn(),
}));
