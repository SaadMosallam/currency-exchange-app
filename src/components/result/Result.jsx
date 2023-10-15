import styles from './styles.module.css';
import { useSelector } from 'react-redux';

function Result() {
    const error = useSelector(state => state.currency.error);
    const result = useSelector(state => state.currency.result);
    const amount = useSelector(state => state.currency.amount);
    const selectedOption = useSelector(state => state.currency.value);

    if (error) return <p>Error loading data</p>

    if (result) return <p className={styles.result}>{parseFloat(amount)} {selectedOption.from} equals {result} {selectedOption.to}</p>
}

export default Result;
