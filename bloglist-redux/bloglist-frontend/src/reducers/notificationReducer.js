export const NOTIFICATION_TIMEOUT = 5000;
let timeoutID;

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.message, isError: action.isError };
    default:
      return state;
  }
};

export const setNotification = (message, isError = false) => {
  return {
    type: "SET_NOTIFICATION",
    message,
    isError,
  };
};

export const emptyNotification = () => {
  return {
    type: "SET_NOTIFICATION",
    message: null,
    isError: false,
  };
};

export const showNotificationWithTimeout = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(emptyNotification());
    }, timeout);
  };
};

export const showErrorNotificationWithTimeout = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(message, true));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(emptyNotification());
    }, timeout);
  };
};

export default notificationReducer;
