import CurrencyInput from '@/components/currencyInput/CurrencyInput';
import Dropdown from '@/components/dropdown/Dropdown';
import styles from './styles.module.css';
import SwapButton from '../swapButton/SwapButton';
import ResetButton from '../resetButton/ResetButton';
import { currencyContext } from '@/store/currencyContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDropDown, setError, setResult } from '@/store/currencySlice';
import Result from '../result/Result';

const CurrencyExchange = ({ currenciesList }) => {
    const dispatch = useDispatch();
    const selectedOption = useSelector(state => state.currency.value);
    const amount = useSelector(state => state.currency.amount);

    useEffect(() => {
        const handleClickAway = (e) => {
            if (!e.target.closest('[data-dropdown]')) {
                dispatch(closeDropDown());
            }
        }
        window.addEventListener('click', handleClickAway)
        return () => {
            window.removeEventListener('click', handleClickAway);
        };
    }, [dispatch]);



    useEffect(() => {
        const { from, to } = selectedOption;
        const fetchResult = async ({ from, to, amount }) => {
            const url = `https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=${amount}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '9af8210d71msh0adc58de1e15513p12c61ajsn6b967a6e4108',
                    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
                }
            };

            try {
                console.log('amount', amount);
                const response = await fetch(url, options);
                const result = await response.text();
                dispatch(setResult(result));
                setError(null);
                console.log(result);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };
        if (from && to && amount !== '' && parseFloat(amount) > 0) {
            fetchResult({ from, to, amount });
        }
    }, [selectedOption, amount, dispatch]);

    return (
        <currencyContext.Provider value={currenciesList}>
            <div className={`${styles.wrapper}`}>
                <h1 className={`${styles.header}`}>Money Exchange</h1>
                <div className={`${styles['section-container']}`} >
                    <section className={`${styles.section}`}>
                        <div className={`${styles.form}`}>
                            <CurrencyInput />
                            <Dropdown id="from" />
                            <SwapButton />
                            <Dropdown id="to" />
                        </div>

                        <ResetButton />
                        <Result />
                    </section>
                </div>

            </div>
        </currencyContext.Provider>
    );
};

export default CurrencyExchange;