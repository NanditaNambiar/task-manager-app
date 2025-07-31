import React from "react";

const categoryColors = {
  Work: "#007bff",
  Personal: "#28a745",
  Others: "#ffc107",
};

const TaskList = ({ tasks, handleEdit, handleDelete, onFilterChange, currentFilter }) => {
  const isOverdue = (deadline, completed) => {
    return deadline && new Date(deadline) < new Date() && !completed;
  };

  return (
    <div>
      <h2 style={{ marginBottom: "15px", color: "#444", textAlign: "center" }}>
        Your Tasks
      </h2>

      {/* Filter Buttons */}
      <div style={styles.filterGroup}>
        {["All", "Work", "Personal", "Others"].map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.filterBtn,
              backgroundColor: currentFilter === cat ? "#f0f0f0" : "#fff",
              borderColor: currentFilter === cat ? "#007bff" : "#ddd",
              color: currentFilter === cat ? "#007bff" : "#333",
            }}
            onClick={() => onFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      {tasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No tasks available.</p>
      ) : (
        tasks.map((task) => {
          const borderColor = categoryColors[task.category] || "#ccc";
          const overdue = isOverdue(task.deadline, task.completed);

          return (
            <div
              key={task.id}
              style={{
                ...styles.card,
                borderLeft: `6px solid ${borderColor}`,
                backgroundColor: overdue ? "#fff0f0" : "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = styles.card.boxShadow;
              }}
            >
              <h3 style={styles.title}>{task.title}</h3>
              <p style={styles.text}>{task.description}</p>
              <p style={styles.meta}><strong>Category:</strong> {task.category}</p>
              <p style={styles.meta}>
                <strong>Deadline:</strong>{" "}
                <span style={{ color: overdue ? "red" : "#333" }}>
                  {task.deadline || "N/A"}
                </span>
              </p>
              <p style={styles.meta}>
                <strong>Track Status:</strong>{" "}
                <span style={{
                  color: task.completed ? "green" : "#d9534f",
                  fontWeight: "bold"
                }}>
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </p>
              <div style={styles.buttonGroup}>
                <button onClick={() => handleEdit(task)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(task.id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

const styles = {
  filterGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
  },
  card: {
    background: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  title: {
    marginBottom: "5px",
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
  },
  text: {
    marginBottom: "10px",
    color: "#555",
  },
  meta: {
    marginBottom: "6px",
    fontSize: "14px",
    color: "#666",
  },
  buttonGroup: {
    marginTop: "12px",
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default TaskList;
