'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AddTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null); // Store user email
  const router = useRouter();

  // Fetch the user's email when the component loads
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch('/api/get-user'); // Endpoint to get user data
        const user = await response.json();

        if (user?.email) {
          setUserEmail(user.email);
        }
      } catch (err) {
        console.error('Error fetching user email:', err);
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName) {
      setError('Task name is required');
      return;
    }

    if (!userEmail) {
      setError('Failed to fetch user email. Please try again.');
      return;
    }

    try {
      const response = await fetch('/api/add-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_name: taskName,
          description,
          task_priority: taskPriority,
          user_email: userEmail, // Pass user email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      // Redirect to tasks page after successful addition
      router.push('/tasks');
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task');
    }
  };

  return (
    <div className="bg-gradient-to-br lg:mt-0 mt-4 from-white to-blue-50 p-10 rounded-lg shadow-2xl relative top-36 w-full max-w-fit mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-700">Add New Task</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="lg:flex lg:space-x-4 lg:space-y-0 space-y-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md transition-colors hover:border-blue-500"
              placeholder="Enter task name"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium">Priority</label>
            <input
              type="text"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md transition-colors hover:border-blue-500"
              placeholder="Enter task priority (optional)"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md transition-colors hover:border-blue-500"
            placeholder="Enter task description (optional)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
