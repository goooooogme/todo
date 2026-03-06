import { Button, Field } from '@/shared';
import type { FC } from 'react';
import React from 'react';
import style from './style.module.scss';
import { addTask, updateLabel, updateTask, useAppSelector, useAppDispatch } from '@/entities';

const BUTTON_TEXTS = {
    ADD: '+ Add',
    UPDATE: '+ Upd',
} as const;

export const FieldAction: FC = () => {
    const dispatch = useAppDispatch();
    const { label, editId } = useAppSelector((state) => state.todo);

    const handleUpdateLabel = (newLabel: string) => {
        dispatch(updateLabel(newLabel));
    };

    const handleAddTask = () => {
        if (!label.trim()) return;

        if (editId) {
            dispatch(updateTask());
        } else {
            dispatch(addTask());
        }
    };

    const buttonText = editId ? BUTTON_TEXTS.UPDATE : BUTTON_TEXTS.ADD;

    return (
        <div className={style['field-action']}>
            <Field onChange={handleUpdateLabel} value={label} />
            <Button text={buttonText} onClick={handleAddTask} />
        </div>
    );
};