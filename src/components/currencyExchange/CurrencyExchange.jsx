import CurrencyInput from '@/components/currencyInput/CurrencyInput';
import Dropdown from '@/components/dropdown/Dropdown';
import styles from './styles.module.css';
import SwapButton from '../swapButton/SwapButton';
import ResetButton from '../resetButton/ResetButton';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDropDown, setError, setResult } from '@/store/currencySlice';
import Result from '../result/Result';
import useDebounce from '@/util';

const CurrencyExchange = () => {
    const dispatch = useDispatch();
    const selectedOption = useSelector(state => state.currency.value);
    const [formattedAmount, setFormattedAmount] = useState('1.0');
    const debouncedAmount = useDebounce(formattedAmount, 2000);

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
        console.log('debouncedAmount', debouncedAmount)
        const { from, to } = selectedOption;
        const fetchResult = async ({ from, to, debouncedAmount }) => {
            const url = `https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=${debouncedAmount}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '9af8210d71msh0adc58de1e15513p12c61ajsn6b967a6e4108',
                    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
                }
            };

            try {
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
        if (from && to && debouncedAmount !== '' && parseFloat(debouncedAmount) > 0) {
            fetchResult({ from, to, debouncedAmount });
        }
    }, [selectedOption, debouncedAmount, dispatch]);

    return (
        <div className={`${styles.wrapper}`}>
            <h1 className={`${styles.header}`}>Money Exchange</h1>
            <div className={`${styles['section-container']}`} >
                <section className={`${styles.section}`}>
                    <div className={`${styles.form}`}>
                        <CurrencyInput formattedAmount={formattedAmount} setFormattedAmount={setFormattedAmount} />
                        <Dropdown id="from" />
                        <SwapButton />
                        <Dropdown id="to" />
                    </div>

                    <ResetButton />
                    <Result debouncedAmount={debouncedAmount} />
                </section>
            </div>

        </div>
    );
};

export default CurrencyExchange;