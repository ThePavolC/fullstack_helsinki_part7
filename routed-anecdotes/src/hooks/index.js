import { useState } from "react";

export const useField = (type, name) => {
  const DEFAULT_VALUE = "";

  const [value, setValue] = useState(DEFAULT_VALUE);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(DEFAULT_VALUE);
  };

  return {
    type,
    value,
    name,
    onChange,
    reset,
  };
};
