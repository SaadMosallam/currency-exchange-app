
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAmount, setFormattedAmount } from '@/store/currencySlice';
import { useState, useEffect } from 'react';
import { valueFormatter } from '@/util';


const CurrencyInput = ({ }) => {
    const formattedAmount = useSelector(state => state.currency.formattedAmount);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*\.?[0-9]?$/.test(value)) {
            dispatch(setAmount(value));
            dispatch(setFormattedAmount(value));
        }
    };

    const handleOnBlur = (e) => {
        const value = e.target.value;
        dispatch(setFormattedAmount(valueFormatter(value)));
    };

    return (
        <div className={`${styles.wrapper}`}>
            <label className={`${styles.currencyLabel}`} htmlFor="currency-input">Amount</label>
            <input
                placeholder='0.0'
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
