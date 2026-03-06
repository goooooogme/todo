import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { App } from '../../index';
import todoReducer from '@/entities/todo/todoSlice';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
    todo: todoReducer,
});

const createMockStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

describe('App Component', () => {
    it('рендеринг', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('My Tasks')).toBeInTheDocument();
    });

    it('рендеринг FieldAction компонента', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
