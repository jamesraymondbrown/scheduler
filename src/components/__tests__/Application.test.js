import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  // This test uses a promise chain, instead of async/await
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Edit" button on the booked appointment.

    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Fire event to change name to "Johnny Jones".

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Johnny Jones" }
    });

    // 5. Click the "Save" button.

    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving..." is displayed.

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."))

    // 7. Check that the appointment now shows the name "Johnny Jones"

    getByText(container, "Johnny Jones")

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."))

    getByText(container, "Error saving appointment")

    fireEvent.click(getByAltText(appointment, "Close"))

    // 1. Render the Application.
    // 2. Wait until the text "Archie Cohen" is displayed.
    // 3. Click the "Edit" button on the booked appointment.
    // 4. Fire event to change name to "Johnny Jones".
    // 5. Click the "Save" button.
    // 6. Check that the element with the text "Saving..." is displayed.
    // 7. Check that the appointment now shows the name "Johnny Jones"
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".

  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting..."))

    getByText(container, "Error deleting appointment")

    fireEvent.click(getByAltText(appointment, "Close"))
  });


});