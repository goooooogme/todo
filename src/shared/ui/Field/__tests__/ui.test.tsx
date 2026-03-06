import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '../ui';

describe('Field Component', () => {
    it('рендер компонента', () => {
        render(<Field value="" onChange={() => {}} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('рендер с placeholder', () => {
        render(<Field value="" onChange={() => {}} placeholder="Enter task" />);
        expect(screen.getByPlaceholderText('Enter task')).toBeInTheDocument();
    });

    it('рендер с дефолтным placeholder', () => {
        render(<Field value="" onChange={() => {}} />);
        expect(screen.getByPlaceholderText('Введите задачу')).toBeInTheDocument();
    });

    it('рендер с значением', () => {
        render(<Field value="Test value" onChange={() => {}} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('Test value');
    });

    it('вызвать onChange когда значение input изменяется', async () => {
        const handleChange = jest.fn();
        const TestComponent = () => {
            const [value, setValue] = React.useState('');
            return (
                <Field 
                    value={value} 
                    onChange={(newValue) => {
                        handleChange(newValue);
                        setValue(newValue);
                    }} 
                />
            );
        };
        render(<TestComponent />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'Hello');

        expect(handleChange).toHaveBeenCalledTimes(5);

        expect(handleChange).toHaveBeenNthCalledWith(1, 'H');
        expect(handleChange).toHaveBeenNthCalledWith(2, 'He');
        expect(handleChange).toHaveBeenNthCalledWith(3, 'Hel');
        expect(handleChange).toHaveBeenNthCalledWith(4, 'Hell');
        expect(handleChange).toHaveBeenNthCalledWith(5, 'Hello');
    });

    it('обновить значение когда prop изменяется', () => {
        const { rerender } = render(<Field value="Initial" onChange={() => {}} />);
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Initial');

        rerender(<Field value="Updated" onChange={() => {}} />);
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Updated');
    });
});
