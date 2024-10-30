import styles from './app.module.scss';
import { ToDoList, TaskType } from '../ToDoList/Todolist';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { removeTask, addTask, changeTaskStatus, changeTaskTitle } from '../../slices/tasksSlice';
import { changeState, FilterValuesType } from '../../slices/filterSlice';
import { useCallback } from 'react';

export const App = () => {
    const dispatch = useDispatch();
    const tasks = useSelector<RootState, Array<TaskType>>(state => state.tasks);
    const filter = useSelector<RootState, FilterValuesType>(state => state.filters.checked);

    const tasksForTodolist = useCallback(() => {
        switch (filter) {
          case "active":
            return tasks.filter((task) => !task.isDone);
          case "completed":
            return tasks.filter((task) => task.isDone);
          default:
            return tasks;
        }
      }, [filter, tasks]);

    function changeFilter(value: FilterValuesType) {
        dispatch(changeState(value));
    }

    function removeTaskHandler(id: string) {
        dispatch(removeTask(id));
    }

    function addTaskHandler(title: string) {
        dispatch(addTask(title));
    }

    function changeStatusHandler(taskId: string, isDone: boolean) {
        dispatch(changeTaskStatus({ id: taskId, isDone }));
    }

    function changeTaskTitleHandler(taskId: string, newTitle: string) {
        dispatch(changeTaskTitle({ id: taskId, title: newTitle }));
    }

    return (
        <div className={styles.App}>
            <ToDoList 
                title={"todos"}
                tasks={tasksForTodolist()}
                removeTask={removeTaskHandler}
                changeFilter={changeFilter}
                addTask={addTaskHandler}
                changeTaskStatus={changeStatusHandler}
                changeTaskTitle={changeTaskTitleHandler}
                filter={filter}
            />
        </div>
    );
};
