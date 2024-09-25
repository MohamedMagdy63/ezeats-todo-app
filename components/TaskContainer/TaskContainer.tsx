import { GetTasks, getUserData } from './actions';


const TasksClient = async () => {
  let tasks: Array<{ task_name: string }> = []; // Initialize as an array
  let error: string | null = null;
  let user;
  try {
    const userData = await getUserData();
    user = userData
    if (user?.email) {
      const result = await GetTasks(user.email);
      tasks = result.tasks;
      error = result.error;
    }
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    error = 'An error occurred while fetching tasks';
  }

  return <TasksComponent tasks={tasks} error={error} />;
};

export default TasksClient;
const TasksComponent = ({ tasks, error }: { tasks: Array<{ task_name: string }>, error: string | null }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tasks.length) {
    return <div>No tasks found</div>;
  }

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-10 rounded-lg shadow-2xl relative top-36 w-full max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-700">Tasks</h1>
      <ul className="space-y-8">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">{task.task_name}</h2>
              <p
                className={`text-sm font-bold ${
                  task.is_completed ? "text-green-500" : "text-red-500"
                }`}
              >
                {task.is_completed ? "Completed" : "Not Completed"}
              </p>
            </div>
            <p className="text-sm text-gray-400">Created at: {new Date(task.created_at).toLocaleString()}</p>
            {task.description && (
              <p className="mt-4 text-gray-600">Description: {task.description}</p>
            )}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Priority: {task.task_priority || "Not set"}
              </p>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">Edit</button>
                <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors duration-200">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>


  
  );
};
