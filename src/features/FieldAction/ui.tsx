import { Button, Field } from '@/shared';
import React from 'react';
import style from './style.module.scss';
import { addTask, updateLabel, updateTask, useAppSelector } from '@/entities';
import { useDispatch } from 'react-redux';

export function FieldAction() {
    const dispatch = useDispatch();
    const { label, editId } = useAppSelector((state) => state.todo);

    function handleUpdateLabel(label: string) {
        dispatch(updateLabel(label));
    }

    function handleAddTask() {
        if (!label) return;
        if (editId) {
            dispatch(updateTask({}))
        } else {
            dispatch(addTask({}));
        }
    }

    const textBtn = editId ? "+ Upd" : "+ Add"

    return (
        <div className={style['field-action']}>
            <Field
                onChange={handleUpdateLabel}
                value={label}
            />
            <Button 
                text={textBtn}
                onClick={handleAddTask} 
            />
        </div>
    )
}