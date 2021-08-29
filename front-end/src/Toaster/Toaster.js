import React from "react";
import Alert from "react-bootstrap/Alert";

/**
 *
 * @param {{
 * onClose: () => {},
 * show: boolean,
 * text: string,
 * variant: string,
 * }} props
 */
const Toaster = (props) => {
  const { onClose, text, variant, show } = props;
  return (
    <Alert
      dismissible
      show={show}
      onClose={onClose}
      transition={false}
      variant={variant}
    >
      <p>{text}</p>
    </Alert>
  );
};

export default Toaster;
