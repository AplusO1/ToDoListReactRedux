import styles from "./todolist.module.scss";
import { ChangeEvent } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { FilterValuesType } from "../../slices/filterSlice";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  changeTaskTitle: (taskId: string, newTitle: string) => void;
  filter: FilterValuesType;
};

export const ToDoList = (props: PropsType) => {
  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div className={styles.todo}>
      <h3 className={styles.title}>{props.title}</h3>
      <AddItemForm addTask={props.addTask} />
      <ul className={styles.todoList}>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue);
          };
          return (
            <li key={t.id} className={t.isDone ? styles["is-done"] : ""}>
              <input
                className={styles.todoCheckbox}
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <button className={styles.button} onClick={onRemoveHandler}>Delete</button>
            </li>
          );
        })}
      </ul>
      <div className={styles["buttonList"]}>
        <button className={`${styles.button} ${props.filter === 'all' ? styles["active-filter"] : ""}`}
          onClick={onAllClickHandler}>All</button>
        <button className={`${styles.button} ${props.filter === 'active' ? styles["active-filter"] : ""}`}
          onClick={onActiveClickHandler}>Active</button>
        <button className={`${styles.button} ${props.filter === 'completed' ? styles["active-filter"] : ""}`}
          onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
};
