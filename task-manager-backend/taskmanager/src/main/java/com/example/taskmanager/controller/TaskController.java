package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return repository.save(task);
    }
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
    }
    @GetMapping("/category/{category}")
public List<Task> getTasksByCategory(@PathVariable String category) {
    return repository.findByCategory(category);
}



    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return repository.findById(id).map(task -> {
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setCompleted(updatedTask.isCompleted());
            task.setDeadline(updatedTask.getDeadline());
            task.setCategory(updatedTask.getCategory());
            return repository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @PatchMapping("/{id}")
    public Task patchTask(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return repository.findById(id).map(task -> {
            updates.forEach((key, value) -> {
                switch (key) {
                    case "title":
                        task.setTitle((String) value);
                        break;
                    case "description":
                        task.setDescription((String) value);
                        break;
                    case "completed":
                        task.setCompleted((Boolean) value);
                        break;
                    case "deadline":
                        task.setDeadline(LocalDate.parse((String) value));
                        break;
                    case "category":
                        task.setCategory((String) value);
                        break;
                    
                }
            });
            return repository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
