import React, { FC } from 'react';
import style from './style.module.scss';
import { ToDo } from '@/widgets';

export const Home: FC = () => {
    return (
        <div className={style.home}>
            <h1 className={style.home__title}>My Tasks</h1>
            <ToDo />
        </div>
    );
};