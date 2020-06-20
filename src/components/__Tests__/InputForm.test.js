import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import InputForm from "../Form/InputForm";

it("add minus button is updated", () => {
  const { container, rerender } = render(<InputForm />);
  const addButton = getByTestId(container, "addButton");
  // this references the reset button which resets the cart item count
  const minusButton = getByTestId(container, "minusButton");
  // this references the p tag that displays the cart item count
  const countTitle = getByTestId(container, "countTitle");
  fireEvent.click(addButton);
  expect(countTitle.textContent).toBe(" 2 ");
  rerender(<InputForm />);
  fireEvent.click(minusButton);
  expect(countTitle.textContent).toBe(" 1 ");
  fireEvent.click(addButton);
  expect(countTitle.textContent).toBe(" 2 ");
  fireEvent.click(addButton);
  expect(countTitle.textContent).toBe(" 3 ");
  fireEvent.click(minusButton);
  expect(countTitle.textContent).toBe(" 2 ");
  fireEvent.click(minusButton);
  expect(countTitle.textContent).toBe(" 1 ");
  fireEvent.click(minusButton);
  expect(countTitle.textContent).toBe(" 1 ");
});
