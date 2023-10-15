
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAmount, setResult } from '@/store/currencySlice';
import { useState, useEffect } from 'react';

const ALLOWED_FRACTION_LENGTH = 1;

const CurrencyInput = () => {
    const amount = useSelector(state => state.currency.amount);
    const [formattedAmount, setFormattedAmount] = useState(amount);

    useEffect(() => {
        setFormattedAmount(amount);
    }, [amount]);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*\.?[0-9]?$/.test(value)) {
            dispatch(setResult(null));
            dispatch(setAmount(value));
            setFormattedAmount(value);
        }
    };

    const valueFormatter = (value) => {
        if (value === '') {
            return setFormattedAmount(null);
        }
        setFormattedAmount(parseFloat(value).toFixed(ALLOWED_FRACTION_LENGTH));
    }

    const handleOnBlur = (e) => {
        const value = e.target.value;
        valueFormatter(value);
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
