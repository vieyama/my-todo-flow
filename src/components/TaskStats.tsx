import React, { useMemo } from 'react';
import { useTaskStore } from '../store/useTaskStore';

const TaskStats: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const percentComplete = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, percentComplete };
  }, [tasks]);

  if (stats.total === 0) {
    return null;
  }

  return (
    <div className="mt-8 mb-4">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span>{stats.pending} pending</span>
        <span>{stats.completed} completed</span>
        <span>{stats.total} total</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 transition-all duration-500 ease-out"
          style={{ width: `${stats.percentComplete}%` }}
          role="progressbar"
          aria-valuenow={stats.percentComplete}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
};

export default TaskStats;