import { ITask } from '../types';
import { EFilter } from '../types';

export const filterTasks = (tasks: ITask[], filterType: EFilter): ITask[] => {
    switch (filterType) {
        case EFilter.ACTIVE:
            return tasks.filter((task) => !task.isCompleted);
        case EFilter.COMPLETED:
            return tasks.filter((task) => task.isCompleted);
        case EFilter.ALL:
        default:
            return tasks;
    }
};
