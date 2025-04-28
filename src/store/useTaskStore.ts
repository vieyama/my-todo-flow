import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, FilterType } from '../types/task';

interface TaskState {
  tasks: Task[];
  pendingFilter: FilterType;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterType) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      pendingFilter: 'all',
      
      addTask: (title: string) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: Date.now(),
        };
        
        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },
      
      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },
      
      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.completed),
        }));
      },
      
      setFilter: (filter: FilterType) => {
        set({ pendingFilter: filter });
      },
    }),
    {
      name: 'task-storage',
    }
  )
);