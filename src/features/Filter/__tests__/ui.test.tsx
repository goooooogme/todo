import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Filter } from '../ui';
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

describe('Filter Component', () => {
    it('рендер фильтры', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <Filter />
            </Provider>
        );

        expect(screen.getByText('Все')).toBeInTheDocument();
        expect(screen.getByText('Активные')).toBeInTheDocument();
        expect(screen.getByText('Выполненные')).toBeInTheDocument();
    });

    it('выделить активный фильтр', () => {
        const store = createMockStore({
            filter: { type: EFilter.ACTIVE },
            tasks: [],
            label: '',
            editId: null,
        });

        const { container } = render(
            <Provider store={store}>
                <Filter />
            </Provider>
        );

        const filterParams = container.querySelectorAll('[role="button"]');

        expect(filterParams[1]).toHaveClass('filter__param--active');
    });

    it('вызвать updateFilter при клике на опцию фильтра', async () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <Filter />
            </Provider>
        );

        const activeFilter = screen.getByText('Активные').closest('[role="button"]');
        if (activeFilter) {
            await userEvent.click(activeFilter);
        }

        const state = store.getState();
        expect(state.todo.filter.type).toBe(EFilter.ACTIVE);
    });

    it('не вызывать updateFilter если кликнуть на тот же фильтр', async () => {
        const store = createMockStore({
            filter: { type: EFilter.ALL },
            tasks: [],
            label: '',
            editId: null,
        });

        render(
            <Provider store={store}>
                <Filter />
            </Provider>
        );

        const allFilter = screen.getByText('Все').closest('[role="button"]');
        if (allFilter) {
            await userEvent.click(allFilter);
        }

        const state = store.getState();
        expect(state.todo.filter.type).toBe(EFilter.ALL);
    });

    it('показать разделители между фильтрами', () => {
        const store = createMockStore();
        const { container } = render(
            <Provider store={store}>
                <Filter />
            </Provider>
        );

        const separators = container.querySelectorAll('.filter__param__separator');
        expect(separators.length).toBeGreaterThan(0);
    });
});
