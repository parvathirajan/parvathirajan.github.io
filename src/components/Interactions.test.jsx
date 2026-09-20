import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "../App";

class IntersectionObserverMock {
  observe(element) {
    element.classList.add("visible");
  }
  disconnect() {}
}

beforeAll(() => {
  globalThis.IntersectionObserver = IntersectionObserverMock;
});

test("renders the updated portfolio and career details", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /Ideas engineered/i })
  ).toBeInTheDocument();
  expect(
    screen.getAllByText("Deloitte Touche Tohmatsu India LLP")
  ).toHaveLength(2);
  expect(screen.getByText("06/2026 - present")).toBeInTheDocument();
  expect(screen.getAllByText("View project ↗")).toHaveLength(3);
});

test("switches between light and dark themes", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
  expect(document.body).toHaveAttribute("data-theme", "dark");
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  expect(document.body).toHaveAttribute("data-theme", "light");
});

test("provides navigation and social links", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: "work" })).toHaveAttribute(
    "href",
    "#work"
  );
  expect(screen.getByRole("link", { name: /Download résumé/ })).toHaveAttribute(
    "href"
  );
  expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
    "target",
    "_blank"
  );
});
