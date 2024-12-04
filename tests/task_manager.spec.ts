import { test } from '@japa/runner';
import { TaskManager } from '../src/task_manager.js'; // Ajusta la ruta si es necesario

// Grupo: Agregar tareas
test.group('add task', (group) => {
  let taskManager: TaskManager;

  group.setup(() => {
    taskManager = new TaskManager();
  });

  test('should add a new task', ({ assert }) => {
    taskManager.addTask('Learn TypeScript');
    const tasks = taskManager.getTasks();

    assert.lengthOf(tasks, 1);
    assert.equal(tasks[0].title, 'Learn TypeScript');
    assert.isFalse(tasks[0].completed);
  });

  test('should assign unique IDs to tasks', ({ assert }) => {
    const task1 = taskManager.addTask('Task 1');
    const task2 = taskManager.addTask('Task 2');

    assert.notEqual(task1.id, task2.id);
  });
});

// Grupo: Obtener tareas
test.group('get tasks', (group) => {
  let taskManager: TaskManager;

  group.setup(() => {
    taskManager = new TaskManager();
    taskManager.addTask('Pending Task 1');
    const completedTask = taskManager.addTask('Completed Task');
    taskManager.completeTask(completedTask.id);
  });

  test('should return all tasks when no filters are provided', ({ assert }) => {
    const tasks = taskManager.getTasks();
    assert.lengthOf(tasks, 2);
  });

  test('should filter completed tasks', ({ assert }) => {
    const tasks = taskManager.getTasks({ filters: { completed: true } });
    assert.lengthOf(tasks, 1);
    assert.isTrue(tasks[0].completed);
    assert.equal(tasks[0].title, 'Completed Task');
  });

  test('should filter pending tasks', ({ assert }) => {
    const tasks = taskManager.getTasks({ filters: { completed: false } });
    assert.lengthOf(tasks, 1);
    assert.isFalse(tasks[0].completed);
    assert.equal(tasks[0].title, 'Pending Task 1');
  });
});

// Grupo: Eliminar tareas
test.group('delete task', (group) => {
  let taskManager: TaskManager;

  group.setup(() => {
    taskManager = new TaskManager();
  });

  test('should delete a task by id', ({ assert }) => {
    const task1 = taskManager.addTask('Task 1');
    const task2 = taskManager.addTask('Task 2');

    taskManager.deleteTask(task1.id);
    const tasks = taskManager.getTasks();

    assert.lengthOf(tasks, 1);
    assert.equal(tasks[0].id, task2.id);
  });

  test('should handle non-existent task id gracefully', ({ assert }) => {
    const task1 = taskManager.addTask('Task 1');
    const task2 = taskManager.addTask('Task 2');

    taskManager.deleteTask(999); // Intentar eliminar una tarea inexistente
    const tasks = taskManager.getTasks();

    assert.lengthOf(tasks, 2); // Ambas tareas deberían seguir ahí
    assert.equal(tasks[0].id, task1.id);
    assert.equal(tasks[1].id, task2.id);
  });
});
