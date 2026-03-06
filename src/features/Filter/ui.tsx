import React from 'react';
import style from './style.module.scss';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useAppSelector, updateFilter } from '@/entities';
import { EFilter } from '@/shared';

const FILTERS = [
    { type: EFilter.ALL, label: 'Все' },
    { type: EFilter.ACTIVE, label: 'Активные' },
    { type: EFilter.COMPLETED, label: 'Выполненные' },
];

export function Filter() {
    const dispatch = useDispatch();
    const { filter } = useAppSelector((state) => state.todo);

    function handleUpdateFilter(type: EFilter) {
        dispatch(updateFilter(type));
    }

    return (
        <div className={style.filter}>
            {FILTERS.map((item, index) => {
                function handleClick() {
                    if (item.type === filter.type) return;

                    handleUpdateFilter(item.type)
                }
                return (
                    <React.Fragment key={item.type}>
                        <div
                            className={clsx(
                                style.filter__param,
                                filter.type === item.type
                                    ? style['filter__param--active']
                                    : style['filter__param--noactive']
                            )}
                            onClick={handleClick}
                        >
                            {item.label}
                        </div>
                        {index < FILTERS.length - 1 && (
                            <div className={clsx(style.filter__param, style['filter__param__separator'])}>
                                |
                            </div>
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    );
}