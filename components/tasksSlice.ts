import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToDo {
  id: number;
  name: string;
}

interface TasksState {
  tasks: ToDo[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state :TasksState, action: PayloadAction<string>) => {
      const newTask: ToDo = {
        id: state.tasks.length,
        name: action.payload,
      };
      state.tasks.push(newTask);
    },
    deleteTask: (state:TasksState, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setTasks: (state:TasksState, action: PayloadAction<ToDo[]>) => {
        state.tasks = action.payload;
    },
  },
})

export const { addTask, deleteTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
