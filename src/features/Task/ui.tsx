import { Checkbox, EditIcon, RemoveIcon } from '@/shared';
import React from 'react';
import style from './style.module.scss';
import { useDispatch } from 'react-redux';
import { editTask, removeTask, updateCompleted } from '@/entities';
import clsx from 'clsx';

export function Task({
    label,
    id,
    isCompleted
}) {
    const dispatch = useDispatch();

    function handleRemove() {
        dispatch(removeTask({ id }))
    }

    function handleChange(value: boolean) {
        dispatch(updateCompleted({
            id,
            isCompleted: value
        }))
    }

    function handleEdit() {
        dispatch(editTask({
            id,
            label
        }))
    }

    return (
        <div className={style.task}>
            <Checkbox 
                onChange={handleChange}
                value={isCompleted}
            />
            <div className={clsx(style.task__label, isCompleted && style['task__label--completed'])}>
                {label}
            </div>
            <div className={style.task__action}>
                <EditIcon onClick={handleEdit} />
                <RemoveIcon onClick={handleRemove} />
            </div>
        </div>
    )
}