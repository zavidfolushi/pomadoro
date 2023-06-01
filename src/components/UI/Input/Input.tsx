import React, { FC, useCallback } from 'react';
import styles from './Input.module.scss';

interface InputProps {
    changeMin: (value: number) => void;
    minutes: number;
    mode: string;
}

const Input: FC<InputProps> = ({ minutes, changeMin, mode }) => {
    const handleIncrement = useCallback(() => {
        if (minutes < 60) {
            changeMin(minutes + 1);
        }
    }, [minutes, changeMin]);

    const handleDecrement = useCallback(() => {
        if (minutes > 1) {
            changeMin(minutes - 1);
        }
    }, [minutes, changeMin]);

    return (
        <div className={styles.input__container}>
            <input type="number" readOnly value={minutes} />
            <div className={styles.input__btn}>
                <button onClick={handleIncrement}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0L11.1962 7.5H0.803848L6 0Z" />
                    </svg>
                </button>
                <button onClick={handleDecrement}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7.5L0.803849 -9.78799e-07L11.1962 -7.02746e-08L6 7.5Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Input;
