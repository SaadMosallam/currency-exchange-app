import styles from "./styles.module.css";
import Image from "next/image";
import downSvg from "@/assets/images/arrowDown.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsDropdownOpen, setCurrency } from "@/store/currencySlice";
import { getOppositeLabel } from "@/util";
import React from "react";

const PLACEHOLDER = "Currency";

const Dropdown = ({ id }) => {
  const dispatch = useDispatch();
  const currenciesList = useSelector((state) => state.currency.currenciesList);
  const isOpen = useSelector((state) => state.currency.isDropdownOpen === id);
  const selectedOption = useSelector((state) => state.currency.value);

  const handleMenuButtonClick = (e) => {
    e.stopPropagation();
    dispatch(setIsDropdownOpen(isOpen ? null : id));
  };

  const handleSelectOption = (e, currency) => {
    e.stopPropagation();
    if (selectedOption[id] === currency) {
      return dispatch(setIsDropdownOpen(null));
    }
    if (selectedOption[getOppositeLabel(id)] !== currency) {
      dispatch(setIsDropdownOpen(null));
      dispatch(setCurrency({ id, value: currency }));
    }
  };

  return (
    <div className={`${styles.wrapper}`}>
      <label data-testid="dropdown-label">
        {id[0].toUpperCase() + id.slice(1)}
      </label>
      <button
        className={`${styles["menu-button"]} ${isOpen && styles.active}`}
        onClick={handleMenuButtonClick}
        data-testid="dropdown-button"
      >
        {selectedOption[id] || PLACEHOLDER}
        <Image width={15} height={15} src={downSvg} alt="arrow down" />

        <ul
          data-dropdown
          className={`${styles.menu} ${isOpen && styles.active}`}
          data-testid="dropdown-menu"
        >
          {currenciesList.map((currency) => (
            <li
              key={currency}
              className={`${styles["menu-item"]} ${
                selectedOption[getOppositeLabel(id)] === currency
                  ? styles.disabled
                  : null
              }`}
              onClick={(e) => handleSelectOption(e, currency)}
            >
              {currency}
            </li>
          ))}
        </ul>
      </button>
    </div>
  );
};

export default Dropdown;
