import arrowSwap from '@/assets/images/arrowSwap.svg';
import Image from 'next/image';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { swapCurrencies } from '@/store/currencySlice';

const SwapButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(swapCurrencies());
    }
    return (
        <button className={`${styles['swap-button']}`} onClick={handleClick}>
            <Image width={15} height={15} src={arrowSwap} alt='swap button' />
        </button>
    );
};

export default SwapButton;
