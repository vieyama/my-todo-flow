import React, { useMemo } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from './TaskItem';
import { Task } from '../types/task';
import { ClipboardList } from 'lucide-react';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const pendingFilter = useTaskStore((state) => state.pendingFilter);

  const filteredTasks = useMemo(() => {
    switch (pendingFilter) {
      case 'pending':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, pendingFilter]);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <ClipboardList size={48} className="text-gray-600 mb-3" />
        <h3 className="text-lg font-medium text-gray-600">No tasks yet</h3>
        <p className="text-gray-500 mt-1">
          Add a task to get started
        </p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <ClipboardList size={48} className="text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-500">
          {pendingFilter === 'pending' ? 'No pending tasks' : 'No completed tasks'}
        </h3>
        <p className="text-gray-500 mt-1">
          {pendingFilter === 'pending'
            ? 'All tasks are completed!'
            : 'Complete some tasks to see them here'}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 max-h-96 overflow-auto scrollbar-hidden">
      {Array.isArray(filteredTasks) &&
        filteredTasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </ul>
  );
};

export default TaskList;