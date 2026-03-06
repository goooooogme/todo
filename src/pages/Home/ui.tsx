import React from 'react'; 
import style from './style.module.scss';
import { ToDo } from '@/widgets';

export function Home() {
    return (
        <div className={style.home}>
            <h1 className={style.home__title}> My Tasks</h1>
            <ToDo />
        </div>
    )
}