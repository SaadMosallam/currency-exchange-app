import CurrencyInput from '@/components/currencyInput';
import Dropdown from '@/components/dropdown';
import styles from '@/styles/currencyExchange.module.css';
import SwapButton from './swapButton';
import ResetButton from './resetButton';

const CurrencyExchange = () => {
    return (
        <div className={`${styles.wrapper}`}>
            <h1 className={`${styles.header}`}>Money Exchange</h1>
            <div className={`${styles['section-container']}`} >
                <section className={`${styles.section}`}>
                    <div className={`${styles.form}`}>
                        <CurrencyInput />
                        <Dropdown label="From" />
                        <SwapButton />

                        <Dropdown label="To" />
                    </div>

                    <ResetButton />
                </section>
            </div>

        </div>
    );
};

export default CurrencyExchange;