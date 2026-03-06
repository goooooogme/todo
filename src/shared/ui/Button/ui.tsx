import React, { FC, ButtonHTMLAttributes } from 'react';
import style from './style.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const Button: FC<ButtonProps> = ({ text, onClick, className, ...props }) => {
    return (
        <button 
            className={style.btn} 
            onClick={onClick}
            {...props}
        >
            {text}
        </button>
    );
};