import NoteList from "./NoteList";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { BrowserRouter, useParams } from "react-router-dom";
import NewNote from "./NewNote";
import App from "./App";
import { NoteForm } from "./NoteForm";

describe("NoteList Component", () => {
  it("should render NoteList component correctly", () => {
    render(
      <BrowserRouter>
        <NoteList />
      </BrowserRouter>
    );
    // const element = screen.getByRole("heading");
    expect(
      screen.getByRole("heading", {
        name: /notes/i,
      })
    ).toBeInTheDocument();
  });

  it("should open modal on clicking on Edit Tags", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Edit Tags"));
    // const arr = screen.getAllByText(/edit tags/i);
    const dialog = screen.getByRole("dialog");

    within(dialog).getByText(/edit tags/i);
    expect(
      screen.getByRole("button", {
        name: /close/i,
      })
    ).toBeInTheDocument();
    // expect();
  });

  it("Create Button takes you to New Note Screen", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const btnElement = screen.getByText("Create");
    expect(btnElement).toBeInTheDocument();
    // userEvent.click(btnElement);

    await user.click(btnElement);

    expect(
      screen.getByRole("heading", {
        name: /new note/i,
      })
    ).toBeInTheDocument();
  });
});

describe("NoteForm Component", () => {
  it("should have Title, Tags and Body Input fields", () => {
    render(
      <BrowserRouter>
        <NoteForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /title/i,
      })
    );
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Body")).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /body/i,
      })
    );
  });
});
