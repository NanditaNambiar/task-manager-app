import React from "react";

const TaskForm = ({
  title, setTitle,
  description, setDescription,
  category, setCategory,
  completed, setCompleted,
  deadline, setDeadline,
  handleSubmit,
  isEditing
}) => {
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>{isEditing ? "Edit Task" : "Add New Task"}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={styles.input}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        style={styles.textarea}
      />

      <label>Category</label>
      <select
            value={category}
              onChange={(e) => setCategory(e.target.value)}
                required
          style={{ padding: "8px", borderRadius: "5px", width: "100%" }}
>
          <option value="" disabled>Add Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
    </select>


      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <span style={{ marginLeft: "8px" }}>Mark as completed</span>
      </label>

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#f9f9f9",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#f9f9f9",
    resize: "vertical",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#fefefe",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#555",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #007bff, #0056b3)",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default TaskForm;
