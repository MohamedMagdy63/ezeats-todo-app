"use client"; // Client Component

const TaskContainer = ({ tasks = [], error }: { tasks: any[]; error: string | null }) => {
  // If there's an error, display it
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If no tasks are present, display a message
  if (!tasks || tasks.length === 0) {
    return <div className="bg-gradient-to-br from-white to-blue-50 p-10 rounded-lg shadow-2xl relative top-36 w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-700">No Tasks Yet</h1>
      </div>;
  }

  // Function to handle task deletion
  const handleDeleteTask = async (taskId: number) => {
    const response = await fetch(`/api/supabase-client`, {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    });
    const data = await response.json();

    if (data.success) {
      console.log('Task deleted successfully');
      window.location.reload(); // Reload the page after deletion
    } else {
      console.error('Error deleting task');
    }
  };

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
                className={`text-sm font-bold ${task.is_completed ? 'text-green-500' : 'text-red-500'}`}
              >
                {task.is_completed ? 'Completed' : 'Not Completed'}
              </p>
            </div>
            <p className="text-sm text-gray-400">Created at: {new Date(task.created_at).toLocaleString()}</p>
            {task.description && (
              <p className="mt-4 text-gray-600">Description: {task.description}</p>
            )}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Priority: {task.task_priority || 'Not set'}
              </p>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">Edit</button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  onClick={() => handleDeleteTask(task.id)} // Call the handler with task ID
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskContainer;
