import React from 'react';
import style from './style.module.scss';

export function Button({
    text,
    onClick
}) {
    return (
        <div className={style.btn} onClick={onClick}>
            {text}
        </div>
    )
}