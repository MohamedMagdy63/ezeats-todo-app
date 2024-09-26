"use client";

import React from "react";

// Modal Component for editing task
const Modal = ({ show, task, onClose, onSave }: { show: boolean; task: any; onClose: () => void; onSave: (updatedTask: any) => void }) => {
  
  const [taskName, setTaskName] = React.useState(task.task_name);
  const [description, setDescription] = React.useState(task.description);
  const [taskPriority, setTaskPriority] = React.useState(task.task_priority);
  const [isCompleted, setIsCompleted] = React.useState(task.is_completed); // Add state for is_completed

  if (!show) return null; // Do not render if modal is not visible

  const handleSave = () => {
    const updatedTask = {
      ...task,
      task_name: taskName,
      description,
      task_priority: taskPriority,
      is_completed: isCompleted, // Include is_completed in the updated task
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-black">Edit Task</h2>
        <label className="block mb-2 text-sm text-black">Task Name:</label>
        <input 
          type="text" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          className="border p-2 text-black rounded-lg w-full mb-4"
        />
        <label className="block mb-2 text-sm">Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border p-2 rounded-lg w-full mb-4 text-black"
        />
        <label className="block mb-2 text-sm">Priority:</label>
        <input 
          type="text" 
          value={taskPriority} 
          onChange={(e) => setTaskPriority(e.target.value)} 
          className="border p-2 rounded-lg w-full mb-4 text-black"
        />
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            checked={isCompleted} 
            onChange={(e) => setIsCompleted(e.target.checked)} 
            className="mr-2"
          />
          <label className="text-sm">Completed</label>
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white py-1 px-3 rounded-lg">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white py-1 px-3 rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
};


// Function to update a task
const updateTask = async (updatedTask: any) => {
  try {
    const response = await fetch(`/api/update-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask), // Send updated task data
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const data = await response.json();

    if (data.success) {
      window.location.reload(); // Reload the page after updating
    }
  } catch (error) {
    console.error("Error during update:", error);
  }
};

// Function to delete a task
const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`/api/delete-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Send task ID
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    const data = await response.json();

    if (data.success) {
      window.location.reload(); // Reload the page after deletion
    }
  } catch (error) {
    console.error("Error during deletion:", error);
  }
};

// Task item component
const TaskItem = ({ task }: { task: any }) => {
  const { task_name, is_completed, created_at, description, task_priority, id } = task;
  const [showModal, setShowModal] = React.useState(false);

  const handleSave = async (updatedTask: any) => {
    console.log("Task updated:", updatedTask);
    await updateTask(updatedTask); // Trigger updateTask API call
  };

  return (
    <>
      <li className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 break-words">{task_name}</h2>
          <p className={`text-sm font-bold ${is_completed ? "text-green-500" : "text-red-500"}`}>
            {is_completed ? "Completed" : "Not Completed"}
          </p>
        </div>
        <p className="text-sm text-gray-400">Created at: {new Date(created_at).toLocaleString()}</p>
        {description && (
          <p className="mt-4 text-gray-600 overflow-hidden text-ellipsis break-words w-full max-h-16 line-clamp-3">
            Description: {description}
          </p>
        )}
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-4">Priority: {task_priority || "Not set"}</p>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
              onClick={() => deleteTask(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </li>
      <Modal show={showModal} task={task} onClose={() => setShowModal(false)} onSave={handleSave} />
    </>
  );
};

// Task list container
const TaskList = ({ tasks }: { tasks: any[] }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </ul>
  );
};

// Main task container component
const TaskContainer = ({ tasks = [], error }: { tasks: any[]; error: string | null }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!tasks.length) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50 p-10 rounded-lg shadow-2xl relative top-36 w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-700">No Tasks Yet</h1>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-10 rounded-lg shadow-2xl w-full lg:max-w-fit mx-auto lg:mx-0 relative top-36">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-700">Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskContainer;
