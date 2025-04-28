import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/task';
import { useTaskStore } from '../store/useTaskStore';

// Mock the store
vi.mock('../store/useTaskStore', () => ({
  useTaskStore: vi.fn()
}));

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    completed: false,
    createdAt: Date.now(),
  };

  beforeEach(() => {
    // Reset the mock store before each test
    (useTaskStore as any).mockImplementation(() => ({
      toggleTask: vi.fn(),
      deleteTask: vi.fn()
    }));
  });

  it('should render task title', () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('should toggle task completion', () => {
    const toggleTaskMock = vi.fn();
    (useTaskStore as any).mockImplementation(() => ({
      toggleTask: toggleTaskMock,
      deleteTask: vi.fn()
    }));

    render(<TaskItem task={mockTask} />);

    const checkbox = screen.getByRole('button', { name: /mark as complete/i });
    fireEvent.click(checkbox);

    expect(toggleTaskMock).toHaveBeenCalledWith(mockTask.id);
  });
});