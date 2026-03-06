
export enum EFilter {
    ALL = 'all',
    COMPLETED = 'completed',
    ACTIVE = 'active'
}

export interface ITask {
    label: string;
    id: number;
    isCompleted: boolean;
}

interface IFilter {
    type: EFilter.ALL | EFilter.COMPLETED | EFilter.ACTIVE;
}

export interface IInitialState {
    filter: IFilter;
    tasks: ITask[];
    label: string;
    editId: number | null;
}
