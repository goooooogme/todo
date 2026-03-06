import { EFilter, IInitialState } from '@/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IInitialState = {
    filter: {
        type: EFilter.ALL,
    },
    tasks: [],
    label: '',
    editId: null,
}

const todoSlice = createSlice({
    initialState,
    name: 'todo',
    reducers: {
        updateFilter: (state, action: PayloadAction<EFilter>) => {
            state.filter = {
                type: action.payload
            }
        },
        addTask: (state, action) => {
            state.tasks = [
                ...state.tasks,
                {
                    label: state.label,
                    isCompleted: false,
                    id: new Date().getTime()
                }
            ];
            state.label = '';
        },
        editTask: (state, action: PayloadAction<{ label: string, id: number }>) => {
            state.label = action.payload.label;
            state.editId = action.payload.id;
            state.tasks = state.tasks.filter((item) => item.id !== action.payload.id);
        },
        removeTask: (state, action: PayloadAction<{ id: number }>) => {
            state.tasks = state.tasks.filter((item) => item.id !== action.payload.id);
        },
        updateLabel: (state, action: PayloadAction<string>) => {
            state.label = action.payload;
        },
        updateCompleted: (state, action: PayloadAction<{ isCompleted: boolean; id: number }>) => {
            state.tasks = state.tasks.map((item) => ({
                ...item,
                isCompleted: action.payload.id === item.id ? action.payload.isCompleted : item.isCompleted,
            }))
        },
        updateTask: (state, action) => {
            const tasks = [...state.tasks];

            tasks.push({
                id: state.editId,
                label: state.label,
                isCompleted: false
            })

            state.tasks = tasks;
            state.editId = null;
            state.label = '';
        },
        updateTasksPositions: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
            const { sourceIndex, destinationIndex } = action.payload;

            const [removed] = state.tasks.splice(sourceIndex, 1);
            state.tasks.splice(destinationIndex, 0, removed);
        }
    }
})

export const {
    updateFilter,
    addTask,
    removeTask,
    updateLabel,
    updateCompleted,
    editTask,
    updateTask,
    updateTasksPositions,
} = todoSlice.actions;

export default todoSlice.reducer;