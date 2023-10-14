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
                    <CurrencyInput />
                    <Dropdown id='1' />
                    <Dropdown id='2' />
                    <SwapButton />
                    <ResetButton />
                </section>
            </div>

        </div>
    );
};

export default CurrencyExchange;