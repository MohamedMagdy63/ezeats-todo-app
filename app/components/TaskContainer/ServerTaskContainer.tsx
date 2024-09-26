import { GetTasks, getUserData } from './actions';
import TaskContainer from './TaskContainer'; 

const ServerTaskContainer = async () => {
  let tasks: Array<{ task_name: string }> = []; // Initialize as an array
  let error: string | null = null;
  let user;

  try {
    const userData = await getUserData();
    user = userData;

    if (user?.email) {
      const result = await GetTasks(user.email);
      tasks = result.tasks;
      error = result.error;
    }
  } catch (err) {
    console.error('Error fetching tasks:', (err as Error).message);
    error = 'An error occurred while fetching tasks';
  }

  return <TaskContainer tasks={tasks} error={error} />;
};

export default ServerTaskContainer;
