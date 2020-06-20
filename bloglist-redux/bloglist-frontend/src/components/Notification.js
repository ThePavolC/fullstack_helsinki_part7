import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const baseStyle = {
    border: "4px solid green",
    color: "green",
    backgroundColor: "lightgrey",
    padding: "10px",
    fontSize: "20px",
  };

  const notification = useSelector((state) => state.notification);

  if (!notification.message) {
    return <></>;
  }

  if (notification.isError) {
    baseStyle.border = "4px solid red";
    baseStyle.color = "red";
  }

  return (
    <div style={baseStyle} id="notification">
      {notification.message}
    </div>
  );
};

export default Notification;
