import { useState } from 'react';

export default function TodoItem({ todo, isDeleteMode, onToggleComplete, onUpdate, onSelectDelete, isSelected }) {
  const [text, setText] = useState(todo.text);

  const handleChange = (e) => {
    setText(e.target.value);
    onUpdate(todo.id, e.target.value);
  };

  return (
    <li>
      {isDeleteMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectDelete(todo.id)}
        />
      )}
      {!isDeleteMode && (
        <input
          type="checkbox"
          onChange={() => onToggleComplete(todo.id)}
        />
      )}
      <input
        type="text"
        value={text}
        onChange={handleChange}
      />
    </li>
  );
}