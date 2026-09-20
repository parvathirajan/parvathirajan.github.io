import { fireEvent, render, screen } from "@testing-library/react";
import { App, buildVaultTopics } from "../App";

class IntersectionObserverMock {
  observe(element) {
    element.classList.add("visible");
  }
  disconnect() {}
}

beforeAll(() => {
  globalThis.IntersectionObserver = IntersectionObserverMock;
});

beforeEach(() => {
  sessionStorage.clear();
});

test("renders the updated portfolio and career details", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /Ideas built/i })
  ).toBeInTheDocument();
  expect(
    screen.getAllByText("Deloitte Touche Tohmatsu India LLP")
  ).toHaveLength(2);
  expect(screen.getByText("05/2026 - present")).toBeInTheDocument();
  expect(screen.getAllByText("View project ↗")).toHaveLength(3);
  expect(screen.getAllByText("View responsibilities")).toHaveLength(2);
});

test("reveals the passcode form only after opening Parvathirajan's Vault", () => {
  render(<App />);
  expect(screen.queryByLabelText("Passcode")).not.toBeInTheDocument();
  expect(
    screen.getByText(/personal archive, thoughtfully collected/i)
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Open the vault/ }));
  expect(screen.getByLabelText("Passcode")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Passcode"), {
    target: { value: "12345" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Unlock/ }));
  expect(screen.getByRole("alert")).toHaveTextContent(/doesn.t match/i);

  fireEvent.change(screen.getByLabelText("Passcode"), {
    target: { value: "00444" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Unlock/ }));
  expect(
    screen.getByText("Your first topic will appear here.")
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Lock vault" }));
  expect(screen.queryByLabelText("Passcode")).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Open the vault/ })
  ).toBeInTheDocument();
});

test("groups downloads and multiple links by topic folder", () => {
  const topics = buildVaultTopics(
    {
      "/data/Cloud Architecture/links.txt":
        "https://aws.amazon.com\nhttps://example.com/guide\ninvalid",
    },
    {
      "/data/Cloud Architecture/diagram.pdf": "/assets/diagram.pdf",
      "/data/Cloud Architecture/links.txt": "/assets/links.txt",
    }
  );

  expect(topics).toEqual([
    {
      name: "Cloud Architecture",
      links: [
        { url: "https://aws.amazon.com", label: "aws.amazon.com" },
        { url: "https://example.com/guide", label: "example.com" },
      ],
      files: [
        {
          name: "diagram",
          filename: "diagram.pdf",
          url: "/assets/diagram.pdf",
        },
      ],
    },
  ]);
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
  expect(
    screen.getByRole("link", { name: /View LinkedIn profile/i })
  ).toHaveAttribute("href", "https://www.linkedin.com/in/parvathirajan-natarajan/");
});
