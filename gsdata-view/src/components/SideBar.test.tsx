import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Sidebar from "./Sidebar";
import "@testing-library/jest-dom"; // Import for Jest matchers

describe("Sidebar Component", () => {
  test("renders all navigation links with icons", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    // Sidebar links
    const storeLink = screen.getByText("Store");
    const skuLink = screen.getByText("SKU");
    const planningLink = screen.getByText("Planning");
    const chartsLink = screen.getByText("Charts");

    expect(storeLink).toBeInTheDocument();
    expect(skuLink).toBeInTheDocument();
    expect(planningLink).toBeInTheDocument();
    expect(chartsLink).toBeInTheDocument();

    // Icons should be present
    expect(screen.getByTestId("store-icon")).toBeInTheDocument();
    expect(screen.getByTestId("sku-icon")).toBeInTheDocument();
    expect(screen.getByTestId("planning-icon")).toBeInTheDocument();
    expect(screen.getByTestId("charts-icon")).toBeInTheDocument();
  });

  test("navigates to correct routes when links are clicked", async () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const storeLink = screen.getByText("Store");
    const skuLink = screen.getByText("SKU");

    // Click on "SKU"
    await userEvent.click(skuLink);
    expect(window.location.pathname).toBe("/skus");

    // Click on "Store"
    await userEvent.click(storeLink);
    expect(window.location.pathname).toBe("/");
  });

  test("applies active styles when a link is active", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const activeLink = screen.getByText("Store").closest("a");
    expect(activeLink).toHaveClass("bg-gray-300", "font-semibold");
  });

  test("sidebar is fixed and positioned correctly", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole("complementary"); // `aside` element

    expect(sidebar).toHaveClass("fixed", "top-16", "left-0", "w-60", "h-[calc(100vh-64px)]", "bg-gray-100", "p-4");
  });
});
