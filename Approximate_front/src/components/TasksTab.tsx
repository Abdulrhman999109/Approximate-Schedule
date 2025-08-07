import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Task {
  taskId?: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  taskDate: string;
}

export default function TasksTab() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [taskDate, setTaskDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch {
      setError("Error fetching tasks.");
    }
  };

  const handleAddOrUpdateTask = async () => {
    setError("");
    setSuccess("");

    if (!title || !description || !priority || !taskDate) {
      setError("Please fill in all fields.");
      return;
    }

    const payload = { title, description, priority, taskDate };

    try {
      const url = editTaskId
        ? `${import.meta.env.VITE_BACKEND_HOST}/tasks/${editTaskId}`
        : `${import.meta.env.VITE_BACKEND_HOST}/tasks`;

      const res = await fetch(url, {
        method: editTaskId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save task");

      setTitle("");
      setDescription("");
      setPriority("Low");
      setTaskDate("");
      setEditTaskId(null);
      setSuccess(editTaskId ? "Task updated." : "Task added.");
      fetchTasks();
    } catch {
      setError("Error saving task.");
    }
  };

  const handleEditTask = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setTaskDate(task.taskDate);
    setEditTaskId(task.taskId || null);
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete task");
      fetchTasks();
    } catch {
      setError("Error deleting task.");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-50 border-red-400";
      case "Medium":
        return "bg-yellow-50 border-yellow-400";
      case "Low":
        return "bg-green-50 border-green-400";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <div className="pt-28 px-6 pb-6 space-y-6 bg-gray-50 min-h-screen max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700">Your Tasks</h2>

      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      <div className="bg-white p-4 rounded shadow space-y-4">
        <h3 className="font-semibold text-lg text-green-700">
          {editTaskId ? "Edit Task" : "Add Task"}
        </h3>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Title</label>
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Description</label>
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Priority</label>
          <select
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Task Date</label>
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700"
            type="date"
            min={today}
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleAddOrUpdateTask}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
        >
          {editTaskId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="font-semibold text-lg text-green-700">Existing Tasks</h3>

        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.taskId}
              className={`border-l-4 p-3 rounded ${getPriorityColor(
                task.priority
              )} flex justify-between items-start`}
            >
              <div>
                <p className="font-bold text-lg">{task.title}</p>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm text-gray-600">
                  Priority: {task.priority} | Date: {task.taskDate}
                </p>
              </div>

              <div className="space-x-2 flex-shrink-0">
                <button
                  onClick={() => handleEditTask(task)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.taskId!)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
