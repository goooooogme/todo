import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../ui';

describe('Checkbox Component', () => {
    it('рендер чекбокса', () => {
        render(<Checkbox value={false} onChange={() => {}} />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('отмеченный когда value равен true', () => {
        render(<Checkbox value={true} onChange={() => {}} />);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    it('неотмеченный когда value равен false', () => {
        render(<Checkbox value={false} onChange={() => {}} />);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);
    });

    it('вызвать onChange с true при клике на неотмеченный чекбокс', async () => {
        const handleChange = jest.fn();
        render(<Checkbox value={false} onChange={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);

        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('вызвать onChange с false при клике на отмеченный чекбокс', async () => {
        const handleChange = jest.fn();
        render(<Checkbox value={true} onChange={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);

        expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('обновить состояние отмеченности когда prop value изменяется', () => {
        const { rerender } = render(<Checkbox value={false} onChange={() => {}} />);
        let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);

        rerender(<Checkbox value={true} onChange={() => {}} />);
        checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });
});
