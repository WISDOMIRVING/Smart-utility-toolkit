import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@smart_utility_tasks';

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error fetching tasks', e);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving tasks', e);
  }
};

export const addTask = async (taskText) => {
  const tasks = await getTasks();
  const newTask = {
    id: Date.now().toString(),
    text: taskText,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  const updatedTasks = [newTask, ...tasks];
  await saveTasks(updatedTasks);
  return updatedTasks;
};

export const updateTask = async (taskId, updates) => {
  const tasks = await getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
  );
  await saveTasks(updatedTasks);
  return updatedTasks;
};

export const deleteTask = async (taskId) => {
  const tasks = await getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  await saveTasks(updatedTasks);
  return updatedTasks;
};
