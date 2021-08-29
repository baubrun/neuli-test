import React from "react";
import { render } from "@testing-library/react";
import Toaster from "../Toaster/Toaster";

describe("Toaster", () => {
  it("should render", () => {
    const props = {
      onClose: () => {},
      show: true,
      text: "error",
      variant: "danger",
    };
    const { getByText } = render(<Toaster {...props} />);
    const elem = getByText(props.text);
    expect(elem).toBeInTheDocument();
  });

  it("should not render", () => {
    const props = {
      onClose: () => {},
      show: false,
      text: "",
      variant: "",
    };
    const { container } = render(<Toaster {...props} />);
    expect(container.firstChild).toBeNull();
  });
});
