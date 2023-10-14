import CurrencyInput from '@/components/currencyInput';
import Dropdown from '@/components/dropdown';
import styles from '@/styles/currencyExchange.module.css';

const CurrencyExchange = () => {
    return (
        <div className={`${styles.wrapper}`}>
            <h1>Money Exchange</h1>

            <section className={``}>
                <CurrencyInput />
                <Dropdown id='1' />
                <Dropdown id='2' />
            </section>
        </div>
    );
};

export default CurrencyExchange;