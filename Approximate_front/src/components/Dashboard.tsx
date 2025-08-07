import TasksTab from "./TasksTab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tasks"); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div className="p-4">
        {activeTab === "tasks" && <TasksTab />}
      </div>
    </div>
  );
}
