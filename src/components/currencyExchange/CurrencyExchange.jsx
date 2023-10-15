import CurrencyInput from '@/components/currencyInput/CurrencyInput';
import Dropdown from '@/components/dropdown/Dropdown';
import styles from './styles.module.css';
import SwapButton from '../swapButton/SwapButton';
import ResetButton from '../resetButton/ResetButton';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDropdownOpen, getResult, setError, setResult } from '@/store/currencySlice';
import Result from '../result/Result';
import useDebounce from '@/util';

const CurrencyExchange = () => {
    const dispatch = useDispatch();
    const selectedOption = useSelector(state => state.currency.value);
    const amount = useSelector(state => state.currency.amount);
    const debouncedAmount = useDebounce(amount, 2000);

    useEffect(() => {
        const handleClickAway = (e) => {
            if (!e.target.closest('[data-dropdown]')) {
                dispatch(setIsDropdownOpen(null));
            }
        }
        window.addEventListener('click', handleClickAway)
        return () => {
            window.removeEventListener('click', handleClickAway);
        };
    }, [dispatch]);



    useEffect(() => {
        const { from, to } = selectedOption;

        if (from && to && debouncedAmount !== '' && parseFloat(debouncedAmount) > 0) {
            dispatch(getResult({ from, to, amount: debouncedAmount }));
        }
    }, [selectedOption, debouncedAmount, dispatch]);

    return (
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
                    <Result debouncedAmount={debouncedAmount} />
                </section>
            </div>

        </div>
    );
};

export default CurrencyExchange;