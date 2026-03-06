import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../ui';

describe('Button Component', () => {
    it('рендер кнопки с текстом', () => {
        render(<Button text="Click me" onClick={() => {}} />);
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('вызвать обработчик клика при нажатии на кнопку', async () => {
        const handleClick = jest.fn();
        render(<Button text="Click me" onClick={handleClick} />);

        const button = screen.getByRole('button', { name: 'Click me' });
        await userEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('отключен когда prop disabled равен true', () => {
        render(<Button text="Click me" onClick={() => {}} disabled />);
        expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();
    });

    it('рендер как элемент кнопки', () => {
        const { container } = render(<Button text="Click me" onClick={() => {}} />);
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
    });
});
