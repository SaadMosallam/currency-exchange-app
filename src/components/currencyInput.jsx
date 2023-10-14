
import { useState } from 'react';
import styles from '@/styles/currencyInput.module.css';

const ALLOWED_FRACTION_LENGTH = 1;

const CurrencyInput = () => {
    const [value, setValue] = useState('1.0');

    const handleChange = (e) => {
        if (/^[0-9]*\.?[0-9]?$/.test(e.target.value)) {
            setValue(e.target.value);
        }
    };

    const handleOnBlur = (e) => {
        if (e.target.value === '') {
            return setValue(parseFloat(0).toFixed(ALLOWED_FRACTION_LENGTH));
        }
        setValue(parseFloat(e.target.value).toFixed(ALLOWED_FRACTION_LENGTH));
    }

    return (
        <>
            <label className={`${styles.currencyLabel}`} for="currency-input">Amount</label>
            <input
                type="text"
                name="currency-input"
                id='currency-input'
                className={`${styles.currencyInput}`}
                value={value}
                onChange={handleChange}
                onBlur={handleOnBlur}
            />
        </>

    );
};

export default CurrencyInput;
