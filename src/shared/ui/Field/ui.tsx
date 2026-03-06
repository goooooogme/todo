import type { FC, ChangeEvent } from 'react';
import React from 'react';
import style from './style.module.scss';

interface FieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    id?: string;
}

export const Field: FC<FieldProps> = ({ 
    value, 
    onChange,
    placeholder = 'Введите задачу',
    id = 'new-task'
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <label htmlFor={id}>
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                className={style.field}
                onChange={handleChange}
                value={value}
            />
        </label>
    );
};