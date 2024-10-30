import { v1 } from "uuid";
import { TaskType } from "../components/ToDoList/Todolist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<TaskType> = [
  { id: v1(), title: "HTML&CSS", isDone: true },
  { id: v1(), title: "JS", isDone: true },
  { id: v1(), title: "ReactJS", isDone: false },
  { id: v1(), title: "Redux", isDone: false },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: TaskType = {
        id: v1(),
        title: action.payload,
        isDone: false,
      };
      state.unshift(newTask);
    },
    changeTaskStatus: (
      state,
      action: PayloadAction<{ id: string; isDone: boolean }>
    ) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.isDone = action.payload.isDone;
      }
    },
    changeTaskTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
  },
});

export const { removeTask, addTask, changeTaskStatus, changeTaskTitle } =
  tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
