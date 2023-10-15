import styles from "./styles.module.css";
import { useSelector } from "react-redux";

function Result({ debouncedAmount }) {
  const error = useSelector((state) => state.currency.error);
  const result = useSelector((state) => state.currency.result);
  const selectedOption = useSelector((state) => state.currency.value);
  const isLoading = useSelector((state) => state.currency.isLoading);

  if (error) return <p className={styles.error}>Error loading data</p>;

  if (isLoading) return <div className={styles.loader}></div>;
  if (result && debouncedAmount !== "")
    return (
      <p className={styles.result}>
        {parseFloat(debouncedAmount)} {selectedOption.from} equals {result}{" "}
        {selectedOption.to}
      </p>
    );
}

export default Result;
