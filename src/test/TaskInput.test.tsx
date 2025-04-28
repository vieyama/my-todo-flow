import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import TaskInput from '../components/TaskInput';
import { useTaskStore } from '../store/useTaskStore';

describe('TaskInput', () => {
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
  
  it('should render input field', () => {
    render(<TaskInput />);
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
  });

  it('should add a new task on form submission', async () => {
    render(<TaskInput />);

    const input = screen.getByTestId('input-test-id');
    fireEvent.change(input, { target: { value: 'New test task' } });
    fireEvent.submit(input);

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('New test task');
    expect(input).toHaveValue('');
  });

  it('should not add empty tasks', () => {
    const { clearCompleted } = useTaskStore.getState()
    render(<TaskInput />);
    clearCompleted()
    const input = screen.getByTestId('input-test-id');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(input);

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(0);
  });
});