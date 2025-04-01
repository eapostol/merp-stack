import { render } from "@testing-library/react";
import App from "../src/App";
import { describe, it, expect } from "vitest";

describe("App component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText("Hello from FastAPI + GraphQL!")).toBeTruthy();
  });
});
