import { useState } from 'react';
import TodoItem from '../components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);

  const addTodo = () => {
    const newTodo = { id: Date.now(), text: '' };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    const todo = todos.find(t => t.id === id);
    setTodos(todos.filter(t => t.id !== id));
    setCompleted([...completed, todo]);
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setItemsToDelete([]);
  };

  const handleDelete = () => {
    setTodos(todos.filter(t => !itemsToDelete.includes(t.id)));
    setCompleted(completed.filter(t => !itemsToDelete.includes(t.id)));
    setItemsToDelete([]);
    setIsDeleteMode(false);
  };

  const updateTodo = (id, text) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text } : t));
    setCompleted(completed.map(t => t.id === id ? { ...t, text } : t));
  };

  const handleSelectDelete = (id) => {
    if (itemsToDelete.includes(id)) {
      setItemsToDelete(itemsToDelete.filter(itemId => itemId !== id));
    } else {
      setItemsToDelete([...itemsToDelete, id]);
    }
  };

  return (
    <div>
      <h1>Todoアプリ</h1>
      <button onClick={addTodo}>追加</button>
      <button onClick={isDeleteMode ? handleDelete : toggleDeleteMode}>
        {isDeleteMode ? '削除実行' : '削除'}
      </button>

      <h2>未完了</h2>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isDeleteMode={isDeleteMode}
            onToggleComplete={toggleComplete}
            onUpdate={updateTodo}
            onSelectDelete={handleSelectDelete}
            isSelected={itemsToDelete.includes(todo.id)}
          />
        ))}
      </ul>

      <h2>完了</h2>
      <ul>
        {completed.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isDeleteMode={isDeleteMode}
            onToggleComplete={() => {}}
            onUpdate={updateTodo}
            onSelectDelete={handleSelectDelete}
            isSelected={itemsToDelete.includes(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}