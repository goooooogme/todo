import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Home } from '../ui';
import todoReducer from '@/entities/todo/todoSlice';
import { BrowserRouter } from 'react-router-dom';

const createMockStore = () => {
    return configureStore({
        reducer: {
            todo: todoReducer,
        },
    });
};

describe('Home Component', () => {
    it('рендер главной страницы', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('My Tasks')).toBeInTheDocument();
    });

    it('рендер виджета задач', () => {
        const store = createMockStore();
        const { container: _container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('должен иметь контейнер главной страницы с правильной структурой', () => {
        const store = createMockStore();
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        const homeContainer = container.querySelector('.home');
        expect(homeContainer).toBeInTheDocument();

        const title = homeContainer?.querySelector('.home__title');
        expect(title).toBeInTheDocument();
        expect(title?.textContent).toBe('My Tasks');
    });
});
