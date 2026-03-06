import todoReducer, {
    addTask,
    removeTask,
    updateTask,
    editTask,
    updateCompleted,
    updateLabel,
    updateFilter,
    updateTasksPositions,
} from '../todoSlice';
import type { IInitialState } from '@/shared';
import { EFilter } from '@/shared';

describe('todoSlice reducer', () => {
    const initialState: IInitialState = {
        filter: { type: EFilter.ALL },
        tasks: [],
        label: '',
        editId: null,
    };

    it('вернуть исходное состояние', () => {
        expect(todoReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('updateLabel', () => {
        it('обновить label', () => {
            const state = todoReducer(initialState, updateLabel('New task'));
            expect(state.label).toBe('New task');
        });
    });

    describe('addTask', () => {
        it('добавить новую задачу с непустым label', () => {
            const stateWithLabel = {
                ...initialState,
                label: 'New Task',
            };
            const state = todoReducer(stateWithLabel, addTask());
            expect(state.tasks).toHaveLength(1);
            expect(state.tasks[0].label).toBe('New Task');
            expect(state.tasks[0].isCompleted).toBe(false);
            expect(state.label).toBe('');
        });

        it('не добавлять задачу с пустым label', () => {
            const state = todoReducer(initialState, addTask());
            expect(state.tasks).toHaveLength(0);
        });

        it('не добавлять задачу с label состоящую только из пробелов', () => {
            const stateWithLabel = {
                ...initialState,
                label: '   ',
            };
            const state = todoReducer(stateWithLabel, addTask());
            expect(state.tasks).toHaveLength(0);
        });
    });

    describe('removeTask', () => {
        it('удалить задачу по id', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [
                    { id: '1', label: 'Task 1', isCompleted: false },
                    { id: '2', label: 'Task 2', isCompleted: false },
                ],
            };
            const state = todoReducer(stateWithTasks, removeTask({ id: '1' }));
            expect(state.tasks).toHaveLength(1);
            expect(state.tasks[0].id).toBe('2');
        });

        it('не влиять на состояние если задача с таким id не найдена', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(stateWithTasks, removeTask({ id: '999' }));
            expect(state.tasks).toHaveLength(1);
        });
    });

    describe('updateCompleted', () => {
        it('обновить статус', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(
                stateWithTasks,
                updateCompleted({ id: '1', isCompleted: true })
            );
            expect(state.tasks[0].isCompleted).toBe(true);
        });

        it('не влиять на состояние если не найдено', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(
                stateWithTasks,
                updateCompleted({ id: '999', isCompleted: true })
            );
            expect(state.tasks[0].isCompleted).toBe(false);
        });
    });

    describe('editTask', () => {
        it('записать editId и label', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(stateWithTasks, editTask({ id: '1' }));
            expect(state.editId).toBe('1');
            expect(state.label).toBe('Task 1');
        });

        it('не влиять на состояние если не найдено', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(stateWithTasks, editTask({ id: '999' }));
            expect(state.editId).toBeNull();
        });
    });

    describe('updateTask', () => {
        it('обновить существующий label', () => {
            const stateWithTasks = {
                ...initialState,
                label: 'Updated Task',
                editId: '1',
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(stateWithTasks, updateTask());
            expect(state.tasks[0].label).toBe('Updated Task');
            expect(state.editId).toBeNull();
            expect(state.label).toBe('');
        });

        it('не обновлять если editId равен null', () => {
            const stateWithTasks = {
                ...initialState,
                label: 'Updated Task',
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(stateWithTasks, updateTask());
            expect(state.tasks[0].label).toBe('Task 1');
        });

        it('не обновлять если label пуст', () => {
            const stateWithTasks = {
                ...initialState,
                label: '   ',
                editId: '1',
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(stateWithTasks, updateTask());
            expect(state.tasks[0].label).toBe('Task 1');
        });
    });

    describe('updateFilter', () => {
        it('обновить тип фильтра', () => {
            const state = todoReducer(initialState, updateFilter(EFilter.ACTIVE));
            expect(state.filter.type).toBe(EFilter.ACTIVE);
        });

        it('обрабатывать все типы фильтров', () => {
            let state = todoReducer(initialState, updateFilter(EFilter.ALL));
            expect(state.filter.type).toBe(EFilter.ALL);

            state = todoReducer(state, updateFilter(EFilter.COMPLETED));
            expect(state.filter.type).toBe(EFilter.COMPLETED);

            state = todoReducer(state, updateFilter(EFilter.ACTIVE));
            expect(state.filter.type).toBe(EFilter.ACTIVE);
        });
    });

    describe('updateTasksPositions', () => {
        it('переместить задачу в новую позицию', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [
                    { id: '1', label: 'Task 1', isCompleted: false },
                    { id: '2', label: 'Task 2', isCompleted: false },
                    { id: '3', label: 'Task 3', isCompleted: false },
                ],
            };
            const state = todoReducer(
                stateWithTasks,
                updateTasksPositions({ sourceIndex: 0, destinationIndex: 2 })
            );
            expect(state.tasks[2].id).toBe('1');
            expect(state.tasks[0].id).toBe('2');
        });

        it('не перемещать если source равен destination', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [
                    { id: '1', label: 'Task 1', isCompleted: false },
                    { id: '2', label: 'Task 2', isCompleted: false },
                ],
            };
            const state = todoReducer(
                stateWithTasks,
                updateTasksPositions({ sourceIndex: 0, destinationIndex: 0 })
            );
            expect(state.tasks).toEqual(stateWithTasks.tasks);
        });

        it('не перемещать если индексы недействительны', () => {
            const stateWithTasks = {
                ...initialState,
                tasks: [{ id: '1', label: 'Task 1', isCompleted: false }],
            };
            const state = todoReducer(
                stateWithTasks,
                updateTasksPositions({ sourceIndex: -1, destinationIndex: 0 })
            );
            expect(state.tasks).toEqual(stateWithTasks.tasks);
        });
    });
});
