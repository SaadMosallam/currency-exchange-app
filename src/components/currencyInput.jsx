
import { useState } from 'react';
import styles from '@/styles/currencyInput.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeAmount } from '@/store/currencySlice';
import { debounce } from '@/util';

const ALLOWED_FRACTION_LENGTH = 1;



const CurrencyInput = () => {
    const amount = useSelector(state => state.currency.amount);
    const [formattedAmount, setFormattedAmount] = useState(amount);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*\.?[0-9]?$/.test(value)) {
            debounce(function () { console.log('latch'); dispatch(changeAmount(value)); }, 2000);
            setFormattedAmount(value);
        }
    };

    const handleOnBlur = (e) => {
        const value = e.target.value;
        if (value === '') {
            return setFormattedAmount(parseFloat(0).toFixed(ALLOWED_FRACTION_LENGTH));
        }
        setFormattedAmount(parseFloat(value).toFixed(ALLOWED_FRACTION_LENGTH));
    }

    return (
        <div className={`${styles.wrapper}`}>
            <label className={`${styles.currencyLabel}`} htmlFor="currency-input">Amount</label>
            <input
                type="text"
                name="currency-input"
                id='currency-input'
                className={`${styles.currencyInput}`}
                value={formattedAmount}
                onChange={handleChange}
                onBlur={handleOnBlur}
            />
        </div>

    );
};

export default CurrencyInput;
