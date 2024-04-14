import React, { useState } from 'react';
import './todolist.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = (): void => {
    if (newTask.trim() !== '') {
      const newTaskItem: Task = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const toggleTaskCompletion = (taskId: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: number): void => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="todo-list">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <button onClick={addTask} className="add-task-button">
        Add Task
      </button>
      <ul className="tasks">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {task.text}
            <button onClick={() => removeTask(task.id)} className="remove-task-button">
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};