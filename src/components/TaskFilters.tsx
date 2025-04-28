import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { FilterType } from '../types/task';

const TaskFilters: React.FC = () => {
  const pendingFilter = useTaskStore((state) => state.pendingFilter);
  const setFilter = useTaskStore((state) => state.setFilter);
  const clearCompleted = useTaskStore((state) => state.clearCompleted);
  const tasks = useTaskStore((state) => state.tasks);

  const hasCompletedTasks = tasks.some(task => task.completed);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex flex-wrap gap-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilter(filter.value)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-300
                      ${pendingFilter === filter.value
                ? 'bg-sky-500 text-white'
                : 'text-gray-600 hover:bg-gray-100/50'
              }`}
            aria-pressed={pendingFilter === filter.value}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <button
        onClick={clearCompleted}
        disabled={!hasCompletedTasks}
        className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 
                  focus:outline-none focus:ring-2 focus:ring-red-300
                  ${hasCompletedTasks
            ? 'text-red-500 hover:bg-red-50'
            : 'text-gray-500 cursor-not-allowed'
          }`}
      >
        Clear completed
      </button>
    </div>
  );
};

export default TaskFilters;