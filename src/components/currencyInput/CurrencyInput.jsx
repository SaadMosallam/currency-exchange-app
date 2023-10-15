
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { setResult } from '@/store/currencySlice';

const ALLOWED_FRACTION_LENGTH = 1;

const CurrencyInput = ({ formattedAmount, setFormattedAmount }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*\.?[0-9]?$/.test(value)) {
            dispatch(setResult(null));
            setFormattedAmount(value);
        }
    };

    const valueFormatter = (value) => {
        if (value === '') {
            return setFormattedAmount(parseFloat(0).toFixed(ALLOWED_FRACTION_LENGTH));
        }
        return (parseFloat(value).toFixed(ALLOWED_FRACTION_LENGTH));
    }

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
                value={valueFormatter(formattedAmount)}
                onChange={handleChange}
                onBlur={handleOnBlur}
            />
        </div>

    );
};

export default CurrencyInput;
