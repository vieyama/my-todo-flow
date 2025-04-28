import React, { useState } from 'react';
import { Task } from '../types/task';
import { useTaskStore } from '../store/useTaskStore';
import { Check, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTask(task.id);
    }, 300);
  };

  return (
    <li
      className={`group relative flex items-center gap-3 p-4 mb-2 bg-white/50 backdrop-blur-5xl rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md
                ${task.completed ? 'bg-gray-50' : ''}
                ${isDeleting ? 'opacity-0 scale-95 translate-x-5' : 'opacity-100 scale-100'}`}
    >
      <button
        onClick={() => toggleTask(task.id)}
        className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border-2 
                  flex items-center justify-center focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                  transition-colors duration-200
                  ${task.completed
            ? 'bg-sky-500 border-sky-500'
            : 'border-gray-500 hover:border-sky-400'
          }`}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed && <Check size={14} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-base text-gray-800 break-words transition-all duration-300
                      ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="cursor-pointer p-1.5 text-red-500 hover:text-red-700 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TaskItem;