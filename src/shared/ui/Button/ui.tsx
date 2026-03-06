import type { FC, ButtonHTMLAttributes } from 'react';
import React from 'react';
import style from './style.module.scss';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const Button: FC<ButtonProps> = ({ text, onClick, className, ...props }) => {
    return (
        <button 
            className={clsx(style.btn, className)}
            onClick={onClick}
            {...props}
        >
            {text}
        </button>
    );
};