import React from 'react';
import style from './style.module.scss';

export function Field({
    value,
    onChange
}) {
    function handleChange(e) {
        onChange(e.target.value);
    }

    return (
        <label htmlFor="new-task">
            <input
                type="text"
                placeholder='Введите задачу'
                className={style.field}
                onChange={handleChange}
                value={value}
            />
        </label>
    )
}