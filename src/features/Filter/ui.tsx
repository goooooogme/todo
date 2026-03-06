import React, { FC } from 'react';
import style from './style.module.scss';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector, updateFilter } from '@/entities';
import { EFilter } from '@/shared';

interface FilterItem {
    type: EFilter;
    label: string;
}

const FILTERS: FilterItem[] = [
    { type: EFilter.ALL, label: 'Все' },
    { type: EFilter.ACTIVE, label: 'Активные' },
    { type: EFilter.COMPLETED, label: 'Выполненные' },
];

export const Filter: FC = () => {
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector((state) => state.todo);

    const handleUpdateFilter = (type: EFilter) => {
        if (filter.type !== type) {
            dispatch(updateFilter(type));
        }
    };

    return (
        <div className={style.filter}>
            {FILTERS.map((item, index) => (
                <React.Fragment key={item.type}>
                    <div
                        className={clsx(
                            style.filter__param,
                            filter.type === item.type
                                ? style['filter__param--active']
                                : style['filter__param--noactive']
                        )}
                        onClick={() => handleUpdateFilter(item.type)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleUpdateFilter(item.type);
                            }
                        }}
                    >
                        {item.label}
                    </div>
                    {index < FILTERS.length - 1 && (
                        <div className={clsx(style.filter__param, style['filter__param__separator'])}>
                            |
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};