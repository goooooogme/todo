import React from 'react';
import './style.css';

export function Checkbox({
    onChange,
    value
}) {
    function handleChange(e) {
        onChange(e.target.checked)
    };

    return (
        <label className="checkbox-wrapper">
            <input type="checkbox" checked={value} onChange={handleChange} />
            <div className="custom-checkbox"></div>
        </label>
    )
}