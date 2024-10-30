import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from "./AddItemForm.module.scss"

type AddItemFormPropsType = {
  addTask: (newTaskTitle: string) => void;
}

export function AddItemForm(props: AddItemFormPropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Title is required")
    }
  };

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  return <div className={styles.inputWrapper}>
    <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? styles.error : ""}
      />
      {error && <div className={styles["error-message"]}>{error}</div>}
    </div>
    <button onClick={addTask}>Add</button>
  </div>
}