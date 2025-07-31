import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_URL = "http://localhost:8080/api/tasks";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, completed, deadline, category };

    const method = editingTaskId ? "PUT" : "POST";
    const url = editingTaskId ? `${API_URL}/${editingTaskId}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      setTitle("");
      setDescription("");
      setCategory("Work");
      setCompleted(false);
      setDeadline("");
      setEditingTaskId(null);
      fetchTasks();
    });
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setCompleted(task.completed);
    setDeadline(task.deadline);
    setCategory(task.category);
    setEditingTaskId(task.id);
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => fetchTasks());
  };

  const filteredTasks =
    filterCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === filterCategory);

  return (
    <div style={styles.appWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          <span style={styles.gradientText}> Task Manager</span>
        </h1>

        <TaskForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          category={category}
          setCategory={setCategory}
          completed={completed}
          setCompleted={setCompleted}
          deadline={deadline}
          setDeadline={setDeadline}
          handleSubmit={handleSubmit}
          isEditing={!!editingTaskId}
        />

        <TaskList
          tasks={filteredTasks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          onFilterChange={setFilterCategory}
          currentFilter={filterCategory}
        />
      </div>
    </div>
  );
};


const styles = {
  appWrapper: {
  backgroundImage: `url("/back.jpg")`,
  backgroundSize: "cover",          
  backgroundRepeat: "no-repeat",      
  backgroundPosition: "top center",   
  backgroundAttachment: "fixed",      
  minHeight: "100vh",
  padding: "30px 0",
},
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#4CB9A7",
    boxShadow: "2px solid #4CB9A7",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "36px",
    fontWeight: "bold",
    letterSpacing: "1px",
    animation: "fadeIn 1s ease-in",
  },
  gradientText: {
  background: "linear-gradient(to right, #000000ff, #000000ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
},

  tagline: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "16px",
    color: "#666",
  },
  select: {
    marginBottom: "20px",
    padding: "8px",
    borderRadius: "5px",
    width: "100%",
    fontSize: "16px",
  },
};


export default TaskManager;
