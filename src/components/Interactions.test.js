import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import Projects from "./Projects";
import { SimpleBottomNavigation } from "./NavBar";
import { resumeData } from "./Data";

jest.mock("react-typical", () => ({ steps }) => <span>{steps[0]}</span>);
jest.mock("react-awesome-slider", () => ({ children }) => (
  <div>{children}</div>
));

test("theme switch sets the selected theme even if the body is out of sync", () => {
  document.body.setAttribute("data-theme", "dark");
  render(<Header />);
  const toggle = screen.getByLabelText("Dark theme");
  fireEvent.click(toggle);
  expect(document.body).toHaveAttribute("data-theme", "dark");
  fireEvent.click(toggle);
  expect(document.body).toHaveAttribute("data-theme", "light");
  expect(screen.getByRole("link", { name: /Get CV/ })).toHaveAttribute("href");
});

test("project buttons open a named dialog and its close button dismisses it", async () => {
  render(<Projects />);
  const title = resumeData.projects[0].title;
  fireEvent.click(
    screen.getByRole("button", { name: `View ${title} details` })
  );
  expect(
    await screen.findByRole("dialog", { name: title })
  ).toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "Close project details" })
  );
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  );
});

test("navigation exposes named links with keyboard-accessible destinations", () => {
  render(<SimpleBottomNavigation />);
  expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
    "href",
    "#resume-experience"
  );
  expect(screen.getAllByRole("link")).toHaveLength(8);
});
