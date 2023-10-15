import { useEffect, useState } from "react";

export const getOppositeLabel = (label) => {
  if (label === "from") return "to";
  return "from";
};

const ALLOWED_FRACTION_LENGTH = 1;

export const valueFormatter = (value) => {
  if (value === "") {
    return null;
  }
  return parseFloat(value).toFixed(ALLOWED_FRACTION_LENGTH);
};

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, value]);
  return debouncedValue;
}
