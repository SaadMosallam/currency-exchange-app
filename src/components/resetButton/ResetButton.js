import { reset } from "@/store/currencySlice";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

const ResetButton = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.currency.value);

  const handleClick = () => {
    dispatch(reset());
  };

  let isDisplayed = true;
  for (const key in selectedOption) {
    if (!selectedOption[key]) isDisplayed = false;
  }

  return (
    isDisplayed && (
      <button
        data-testid="reset-button"
        className={`${styles["reset-button"]}`}
        onClick={handleClick}
      >
        Reset
      </button>
    )
  );
};

export default ResetButton;
