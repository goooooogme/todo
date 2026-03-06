import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Task } from '../ui';
import todoReducer from '@/entities/todo/todoSlice';
import type { IInitialState} from '@/shared';
import { EFilter } from '@/shared';

const createMockStore = (todoState: Partial<IInitialState> = {}) => {
    const defaultState: IInitialState = {
        filter: { type: EFilter.ALL },
        tasks: [],
        label: '',
        editId: null,
    };

    return configureStore({
        reducer: {
            todo: todoReducer,
        },
        preloadedState: {
            todo: { ...defaultState, ...todoState },
        },
    });
};

describe('Task Component', () => {
    it('рендерит задачу', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <Task id="1" label="Test Task" isCompleted={false} />
            </Provider>
        );

        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    it('рендерит чекбокс', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <Task id="1" label="Test Task" isCompleted={false} />
            </Provider>
        );

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('отображать отмеченный чекбокс', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <Task id="1" label="Test Task" isCompleted={true} />
            </Provider>
        );

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    it('отображать неотмеченный чекбокс', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <Task id="1" label="Test Task" isCompleted={false} />
            </Provider>
        );

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);
    });

    it('применять стиль завершенной задачи', () => {
        const store = createMockStore();
        const { container } = render(
            <Provider store={store}>
                <Task id="1" label="Test Task" isCompleted={true} />
            </Provider>
        );

        const label = container.querySelector('.task__label');
        expect(label).toHaveClass('task__label--completed');
    });

    it('не применять стиль завершенной задачи, когда задача не завершена', () => {
        const store = createMockStore();
        const { container } = render(
            <Provider store={store}>
                <Task id="1" label="Test Task" isCompleted={false} />
            </Provider>
        );

        const label = container.querySelector('.task__label');
        expect(label).not.toHaveClass('task__label--completed');
    });

    it('вызвать updateCompleted при клике на чекбокс', async () => {
        const store = createMockStore({
            tasks: [{ id: '1', label: 'Test Task', isCompleted: false }],
            filter: { type: EFilter.ALL },
            label: '',
            editId: null,
        });
        render(
            <Provider store={store}>
                <Task id="1" label="Test Task" isCompleted={false} />
            </Provider>
        );

        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);

        const state = store.getState();
        expect(state.todo.tasks[0]?.isCompleted).toBe(true);
    });

    it('рендерит кнопки действий', () => {
        const store = createMockStore();
        const { container } = render(
            <Provider store={store}>
                <Task id="1" label="Test Task" isCompleted={false} />
            </Provider>
        );

        const actions = container.querySelector('.task__action');
        expect(actions).toBeInTheDocument();
        expect(actions?.children.length).toBeGreaterThan(0);
    });
});
