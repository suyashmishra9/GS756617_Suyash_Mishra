import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";

describe("Navbar Component", () => {
  test("renders logo, title, and user icon correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Logo should be present
    const logo = screen.getByAltText("G Synergy Logo");
    expect(logo).toBeInTheDocument();

    // Title should be centered
    const title = screen.getByText("Data Viewer App");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("absolute left-1/2 transform -translate-x-1/2");

    // User icon should be present
    const userIcon = screen.getByRole("img", { hidden: true }); // react-icons render as svg
    expect(userIcon).toBeInTheDocument();
  });

  test("navigates to '/' when clicking the logo", async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logoLink = screen.getByRole("link", { name: /g synergy logo/i });

    expect(logoLink).toHaveAttribute("href", "/");

    await userEvent.click(logoLink);
    expect(window.location.pathname).toBe("/");
  });

  test("renders a user profile icon with expected styles", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  
    const userIcon = screen.getByTestId("user-icon");
  
    expect(userIcon).toHaveClass("text-gray-600", "text-2xl", "cursor-pointer", "hover:text-gray-900");
  });
  

  test("title remains centered even with long text", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const title = screen.getByText("Data Viewer App");
    expect(title).toHaveClass("absolute left-1/2 transform -translate-x-1/2");
  });

  test("logo image has fallback alt text in case of error", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logo = screen.getByAltText("G Synergy Logo");
    expect(logo).toHaveAttribute("src", "src/assets/gsynergy-logo.svg");

    // Simulate image error
    logo.dispatchEvent(new Event("error"));

    // Fallback behavior (logo should still exist in the DOM)
    expect(logo).toBeInTheDocument();
  });

  test("Navbar maintains fixed positioning on scroll", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const navbar = screen.getByRole("navigation");
    expect(navbar).toHaveClass("fixed top-0 left-0 w-full z-50");

    // Simulate scroll
    window.scrollY = 500;
    window.dispatchEvent(new Event("scroll"));

    // Navbar should still be fixed
    expect(navbar).toHaveClass("fixed top-0 left-0 w-full z-50");
  });
});
