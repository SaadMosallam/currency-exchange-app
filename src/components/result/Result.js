import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import React from "react";

function Result({ debouncedAmount }) {
  const error = useSelector((state) => state.currency.error);
  const result = useSelector((state) => state.currency.result);
  const selectedOption = useSelector((state) => state.currency.value);
  const isLoading = useSelector((state) => state.currency.isLoading);

  if (error) return <p className={styles.error}>Error loading data</p>;

  if (isLoading)
    return <div data-testid="loading" className={styles.loader}></div>;

  if (result && debouncedAmount !== "")
    return (
      <p data-testid="result" className={styles.result}>
        {parseFloat(debouncedAmount)} {selectedOption.from} equals {result}{" "}
        {selectedOption.to}
      </p>
    );
}

export default Result;
