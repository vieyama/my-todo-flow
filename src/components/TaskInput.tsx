import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { PlusCircle } from 'lucide-react';

const TaskInput: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimedText = taskTitle.trim()
    if (trimedText.length) {
      addTask(taskTitle.trim());
      setTaskTitle('');
      triggerAnimation();
    }
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative transition-all mb-8 ${isAnimating ? 'scale-102' : 'scale-100'}`}
    >
      <div className="relative flex items-center">
        <input
          data-testid="input-test-id"
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="w-full pl-4 pr-12 py-4 rounded-xl bg-white/50 backdrop-blur-5xl shadow-md border border-transparent focus:border-sky-400 focus:ring-2 focus:ring-sky-200 focus:outline-none transition-all duration-300 text-gray-800"
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-3 rounded-lg p-1 text-sky-500 hover:text-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2focus:ring-sky-300 "
          aria-label="Add task"
        >
          <PlusCircle size={24} />
        </button>
      </div>
    </form>
  );
};

export default TaskInput;