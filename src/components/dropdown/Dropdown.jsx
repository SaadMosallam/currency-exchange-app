
import styles from './styles.module.css';
import Image from "next/image";
import downSvg from '@/assets/images/arrowDown.svg';
import { useDispatch, useSelector } from "react-redux";
import { setIsDropdownOpen, selectCurrency } from "@/store/currencySlice";
import { getOppositeLabel } from "@/util";


const PLACEHOLDER = 'Currency';

const Dropdown = ({ id }) => {
    const dispatch = useDispatch();
    const currenciesList = useSelector(state => state.currency.currenciesList);
    const isOpen = useSelector(state => state.currency.isDropdownOpen === id);
    const selectedOption = (useSelector(state => state.currency.value));

    const handleMenuButtonClick = (e) => {
        e.stopPropagation();
        dispatch(setIsDropdownOpen(isOpen ? null : id));
    }

    const handleSelectOption = (e) => {
        e.stopPropagation();
        if (selectedOption[id] === e.target.innerText.trim()) {
            return dispatch(setIsDropdownOpen(null));
        }
        if (selectedOption[getOppositeLabel(id)] !== e.target.innerText.trim()) {
            dispatch(setIsDropdownOpen(null));
            dispatch(selectCurrency({ id, value: e.target.innerText.trim() }))
        }
    };



    return (
        <div className={`${styles.wrapper}`}>
            <label>{id[0].toUpperCase() + id.slice(1)}</label>
            <button className={`${styles['menu-button']} ${isOpen && styles.active}`} onClick={handleMenuButtonClick}>
                {selectedOption[id] || PLACEHOLDER}
                <Image width={15} height={15} src={downSvg} alt="arrow down" />
                {
                    <ul data-dropdown className={`${styles.menu} ${isOpen && styles.active}`}>{
                        currenciesList.map(currency => (
                            <li key={currency} className={`${styles['menu-item']} ${selectedOption[getOppositeLabel(id)] === currency ? styles.disabled : null}`} onClick={handleSelectOption}>
                                {currency}
                            </li>
                        ))
                    }
                    </ul>
                }
            </button>
        </div>
    )
};

export default Dropdown;
