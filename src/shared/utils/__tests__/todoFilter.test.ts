import { filterTasks } from '../todoFilter';
import type { ITask } from '../../types';
import { EFilter } from '../../types';

describe('filterTasks', () => {
    const mockTasks: ITask[] = [
        { id: '1', label: 'Task 1', isCompleted: false },
        { id: '2', label: 'Task 2', isCompleted: true },
        { id: '3', label: 'Task 3', isCompleted: false },
        { id: '4', label: 'Task 4', isCompleted: true },
    ];

    describe('EFilter.ALL', () => {
        it('вернуть все задачи', () => {
            const result = filterTasks(mockTasks, EFilter.ALL);
            expect(result).toHaveLength(4);
            expect(result).toEqual(mockTasks);
        });

        it('вернуть пустой массив когда массив задач пуст', () => {
            const result = filterTasks([], EFilter.ALL);
            expect(result).toHaveLength(0);
        });
    });

    describe('EFilter.ACTIVE', () => {
        it('вернуть только активные (не завершенные) задачи', () => {
            const result = filterTasks(mockTasks, EFilter.ACTIVE);
            expect(result).toHaveLength(2);
            expect(result.every((task) => !task.isCompleted)).toBe(true);
            expect(result).toEqual([
                { id: '1', label: 'Task 1', isCompleted: false },
                { id: '3', label: 'Task 3', isCompleted: false },
            ]);
        });

        it('вернуть пустой массив когда нет активных задач', () => {
            const completedTasks: ITask[] = [
                { id: '1', label: 'Task 1', isCompleted: true },
                { id: '2', label: 'Task 2', isCompleted: true },
            ];
            const result = filterTasks(completedTasks, EFilter.ACTIVE);
            expect(result).toHaveLength(0);
        });
    });

    describe('EFilter.COMPLETED', () => {
        it('вернуть только завершенные задачи', () => {
            const result = filterTasks(mockTasks, EFilter.COMPLETED);
            expect(result).toHaveLength(2);
            expect(result.every((task) => task.isCompleted)).toBe(true);
            expect(result).toEqual([
                { id: '2', label: 'Task 2', isCompleted: true },
                { id: '4', label: 'Task 4', isCompleted: true },
            ]);
        });

        it('вернуть пустой массив когда нет завершенных задач', () => {
            const activeTasks: ITask[] = [
                { id: '1', label: 'Task 1', isCompleted: false },
                { id: '2', label: 'Task 2', isCompleted: false },
            ];
            const result = filterTasks(activeTasks, EFilter.COMPLETED);
            expect(result).toHaveLength(0);
        });
    });
});
