import { FieldAction, Filter, Task } from '@/features';
import React from 'react';
import style from './style.module.scss';
import { useAppSelector, updateTasksPositions } from '@/entities';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from 'react-redux';
import { EFilter } from '@/shared';

export function ToDo() {
    const dispatch = useDispatch();
    const { tasks, filter } = useAppSelector((state) => state.todo);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        dispatch(
            updateTasksPositions({
                sourceIndex: result.source.index,
                destinationIndex: result.destination.index
            })
        );
    };

    return (
        <>
            <FieldAction />

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todoList">
                    {(provided) => (
                        <div
                            className={style.wrap}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {Boolean(tasks.length) && <Filter />}

                            {tasks.map((item, index) => {
                                const isShowActive = filter.type === EFilter.ACTIVE && !item.isCompleted;
                                const isShowCompleted = filter.type === EFilter.COMPLETED && item.isCompleted;
                                const isShowAll = filter.type === EFilter.ALL;

                                const isShow = isShowActive || isShowCompleted || isShowAll;

                                if (!isShow) return null;

                                return (
                                    <Draggable
                                        key={item.id}
                                        draggableId={String(item.id)}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style
                                                }}
                                            >
                                                <Task {...item} />
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}