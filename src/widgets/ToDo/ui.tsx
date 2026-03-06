import { FieldAction, Filter, Task } from '@/features';
import type { FC} from 'react';
import React, { useMemo } from 'react';
import style from './style.module.scss';
import { useAppSelector, useAppDispatch, updateTasksPositions } from '@/entities';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { filterTasks } from '@/shared';

export const ToDo: FC = () => {
    const dispatch = useAppDispatch();
    const { tasks, filter } = useAppSelector((state) => state.todo);

    const filteredTasks = useMemo(() => filterTasks(tasks, filter.type), [tasks, filter.type]);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        dispatch(
            updateTasksPositions({
                sourceIndex: source.index,
                destinationIndex: destination.index,
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

                            {filteredTasks.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={String(item.id)}
                                    index={index}
                                >
                                    {(providedDrag) => (
                                        <div
                                            ref={providedDrag.innerRef}
                                            {...providedDrag.draggableProps}
                                            {...providedDrag.dragHandleProps}
                                            style={{
                                                ...providedDrag.draggableProps.style,
                                            }}
                                        >
                                            <Task {...item} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};