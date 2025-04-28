import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { useTaskStore } from '../store/useTaskStore';

describe('TaskList', () => {
  beforeEach(() => {
    // Reset the mock store before each test
    useTaskStore.setState({
      tasks: [],
      pendingFilter: 'all',
      addTask: useTaskStore.getState().addTask,
      toggleTask: useTaskStore.getState().toggleTask,
      deleteTask: useTaskStore.getState().deleteTask,
      clearCompleted: useTaskStore.getState().clearCompleted,
      setFilter: useTaskStore.getState().setFilter
    }, true);
  });

  it('should show empty state when no tasks exist', () => {
    render(<TaskList />);
    expect(screen.getByText('No tasks yet')).toBeInTheDocument();
  });

  it('should render tasks', () => {
    const { addTask } = useTaskStore.getState();
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');

    render(<TaskList />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should filter pending tasks', () => {
    const { addTask, setFilter, toggleTask } = useTaskStore.getState();
    addTask('Task 1');//2
    addTask('Task 2');//1
    addTask('Task 3');//0

    const tasks = useTaskStore.getState().tasks
    const task1Id = tasks[2].id

    toggleTask(task1Id)
    setFilter('pending');

    render(<TaskList />);
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should filter completed tasks', () => {
    const { addTask, setFilter, toggleTask } = useTaskStore.getState();
    addTask('Task 1');//1
    addTask('Task 2');//0

    const tasks = useTaskStore.getState().tasks
    const task1Id = tasks[1].id

    toggleTask(task1Id)
    setFilter('completed');

    render(<TaskList />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});