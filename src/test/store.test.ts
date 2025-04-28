import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from '../store/useTaskStore';

describe('Task Store', () => {
  beforeEach(() => {
    // Reset the store state before each test
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

  it('should add a new task', () => {
    const { addTask } = useTaskStore.getState();
    addTask('Test task');

    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test task');
    expect(tasks[0].completed).toBe(false);
  });

  it('should toggle task completion', () => {
    const { addTask, toggleTask } = useTaskStore.getState();
    addTask('Test task');

    const { tasks } = useTaskStore.getState();
    const taskId = tasks[0].id;

    toggleTask(taskId);
    expect(useTaskStore.getState().tasks[0].completed).toBe(true);

    toggleTask(taskId);
    expect(useTaskStore.getState().tasks[0].completed).toBe(false);
  });

  it('should delete a task', () => {
    const { addTask, deleteTask } = useTaskStore.getState();
    addTask('Test task');

    const { tasks } = useTaskStore.getState();
    const taskId = tasks[0].id;

    deleteTask(taskId);
    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it('should clear completed tasks', () => {
    const store = useTaskStore.getState();

    store.addTask('Task 1');
    store.addTask('Task 2');
    store.addTask('Task 3');

    const tasks = useTaskStore.getState().tasks;
    store.toggleTask(tasks[1]?.id); // Mark Task 1 as completed
    store.toggleTask(tasks[2]?.id); // Mark Task 2 as completed

    store.clearCompleted(); // Should remove completed tasks

    const remainingTasks = useTaskStore.getState().tasks;

    expect(remainingTasks).toHaveLength(1);
    expect(remainingTasks[0].title).toBe('Task 3');
  });

  it('should set pending filter', () => {
    const { setFilter } = useTaskStore.getState();

    setFilter('completed');
    expect(useTaskStore.getState().pendingFilter).toBe('completed');

    setFilter('pending');
    expect(useTaskStore.getState().pendingFilter).toBe('pending');
  });
});