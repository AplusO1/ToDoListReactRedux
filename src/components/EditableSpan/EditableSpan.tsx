import styles from "./EditableSpan.module.scss";
import { ChangeEvent, KeyboardEvent, useState } from "react";
type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activeViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditMode(false);
      props.onChange(title);
    }
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  return editMode ? (
    <input
      className= {styles.input}
      value={title}
      onBlur={activeViewMode}
      onChange={onChangeTitleHandler}
      onKeyDown={onKeyDownHandler}
      autoFocus
    />
  ) : (
    <span className = {styles.span} onClick={activateEditMode}>{props.title}</span>
  );
}
