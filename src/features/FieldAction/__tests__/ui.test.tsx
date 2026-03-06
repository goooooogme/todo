import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { FieldAction } from '../ui';
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

describe('FieldAction Component', () => {
    it('рендер fieldAction', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('показать кнопку add', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        expect(screen.getByRole('button', { name: /\+ Add/i })).toBeInTheDocument();
    });

    it('показать кнопку update при редактировании', () => {
        const store = createMockStore({
            filter: { type: EFilter.ALL },
            tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            label: 'Editing task',
            editId: '1',
        });

        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        expect(screen.getByRole('button', { name: /\+ Upd/i })).toBeInTheDocument();
    });

    it('обновить label при вводе в поле', async () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'New Task');

        const state = store.getState();
        expect(state.todo.label).toBe('New Task');
    });

    it('не добавлять задачу если label пуст', async () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        const button = screen.getByRole('button', { name: /\+ Add/i });
        await userEvent.click(button);

        const state = store.getState();
        expect(state.todo.tasks).toHaveLength(0);
    });

    it('добавить задачу при клике на кнопку', async () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'New Task');

        const button = screen.getByRole('button', { name: /\+ Add/i });
        await userEvent.click(button);

        const state = store.getState();
        expect(state.todo.tasks).toHaveLength(1);
        expect(state.todo.tasks[0].label).toBe('New Task');
        expect(state.todo.label).toBe('');
    });

    it('очистить поле после добавления задачи', async () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        const input = screen.getByRole('textbox') as HTMLInputElement;
        await userEvent.type(input, 'New Task');

        const button = screen.getByRole('button', { name: /\+ Add/i });
        await userEvent.click(button);

        expect(input.value).toBe('');
    });

    it('показать начальный label при редактировании', () => {
        const store = createMockStore({
            filter: { type: EFilter.ALL },
            tasks: [{ id: '1', label: 'Original Task', isCompleted: false }],
            label: 'Original Task',
            editId: '1',
        });

        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('Original Task');
    });

    it('не добавлять с label состоящую только из пробелов', async () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <FieldAction />
            </Provider>
        );

        const input = screen.getByRole('textbox');
        await userEvent.type(input, '   ');

        const button = screen.getByRole('button', { name: /\+ Add/i });
        await userEvent.click(button);

        const state = store.getState();
        expect(state.todo.tasks).toHaveLength(0);
    });
});
