import arrowSwap from '@/assets/images/arrowSwap.svg';
import Image from 'next/image';
import styles from '@/styles/swapButton.module.css';

const SwapButton = () => {
    return (
        <button className={`${styles['swap-button']}`}>
            <Image width={15} height={15} src={arrowSwap} alt='swap button' />
        </button>
    );
};

export default SwapButton;
