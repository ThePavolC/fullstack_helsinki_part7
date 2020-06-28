import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const Notification = () => {
  const [severity, setSeverity] = useState("success");
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification.isError) {
      setSeverity("error");
    }
  }, [notification]);

  if (!notification.message) {
    return <></>;
  }

  return (
    <Alert id="notification" severity={severity}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
