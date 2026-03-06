import type { PayloadAction} from '@reduxjs/toolkit';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { IInitialState, ITask } from '@/shared';
import { EFilter } from '@/shared';

const initialState: IInitialState = {
    filter: { type: EFilter.ALL },
    tasks: [],
    label: '',
    editId: null,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        updateFilter: (state, action: PayloadAction<EFilter>) => {
            state.filter.type = action.payload;
        },
        updateLabel: (state, action: PayloadAction<string>) => {
            state.label = action.payload;
        },
        addTask: (state) => {
            if (!state.label.trim()) return;
            const newTask: ITask = {
                id: nanoid(),
                label: state.label,
                isCompleted: false,
            };
            state.tasks.push(newTask);
            state.label = '';
        },
        editTask: (state, action: PayloadAction<{ id: string }>) => {
            const foundTask = state.tasks.find((t) => t.id === action.payload.id);
            if (!foundTask) return;
            state.editId = foundTask.id;
            state.label = foundTask.label;
        },
        updateTask: (state) => {
            if (!state.editId || !state.label.trim()) return;
            const foundTask = state.tasks.find((t: ITask) => t.id === state.editId);
            if (foundTask) {
                foundTask.label = state.label;
            } else {
                state.tasks.push({
                    id: state.editId,
                    label: state.label,
                    isCompleted: false,
                });
            }
            state.editId = null;
            state.label = '';
        },
        removeTask: (state, action: PayloadAction<{ id: string }>) => {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
        },
        updateCompleted: (state, action: PayloadAction<{ id: string; isCompleted: boolean }>) => {
            const foundTask = state.tasks.find((t) => t.id === action.payload.id);
            if (foundTask) foundTask.isCompleted = action.payload.isCompleted;
        },
        updateTasksPositions: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
            const { sourceIndex, destinationIndex } = action.payload;
            if (
                sourceIndex < 0 || 
                sourceIndex >= state.tasks.length || 
                destinationIndex < 0 || 
                destinationIndex >= state.tasks.length ||
                sourceIndex === destinationIndex
            ) return;

            const [movedTask] = state.tasks.splice(sourceIndex, 1);
            state.tasks.splice(destinationIndex, 0, movedTask);
        },
    },
});

export const {
    updateFilter,
    updateLabel,
    addTask,
    editTask,
    updateTask,
    removeTask,
    updateCompleted,
    updateTasksPositions,
} = todoSlice.actions;

export default todoSlice.reducer;