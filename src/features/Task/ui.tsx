import { Checkbox, EditIcon, RemoveIcon } from '@/shared';
import React, { FC } from 'react';
import style from './style.module.scss';
import { useAppDispatch, editTask, removeTask, updateCompleted } from '@/entities';
import { ITask } from '@/shared';
import clsx from 'clsx';

export const Task: FC<ITask> = ({ label, id, isCompleted }) => {
    const dispatch = useAppDispatch();

    const handleRemove = () => {
        dispatch(removeTask({ id }));
    };

    const handleChange = (value: boolean) => {
        dispatch(
            updateCompleted({
                id,
                isCompleted: value,
            })
        );
    };

    const handleEdit = () => {
        dispatch(
            editTask({
                id,
            })
        );
    };

    return (
        <div className={style.task}>
            <Checkbox onChange={handleChange} value={isCompleted} />
            <div
                className={clsx(
                    style.task__label,
                    isCompleted && style['task__label--completed']
                )}
            >
                {label}
            </div>
            <div className={style.task__action}>
                <EditIcon onClick={handleEdit} />
                <RemoveIcon onClick={handleRemove} />
            </div>
        </div>
    );
};