import styles from '@/styles/resetButton.module.css';

const ResetButton = () => {
    return (
        <button className={`${styles['reset-button']}`}>
            Reset
        </button>
    );
};

export default ResetButton;
