import type { FC, ChangeEvent } from 'react';
import React from 'react';
import './style.css';

interface CheckboxProps {
    onChange: (checked: boolean) => void;
    value: boolean;
    id?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ onChange, value, id }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <label className="checkbox-wrapper">
            <input 
                id={id}
                type="checkbox" 
                checked={value} 
                onChange={handleChange} 
            />
            <div className="custom-checkbox" />
        </label>
    );
};