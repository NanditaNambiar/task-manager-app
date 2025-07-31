package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Optional<Task> updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(updatedTask.getTitle());
            return taskRepository.save(task);
        });
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    
    public Optional<Task> patchTask(Long id, Map<String, Object> updates) {
        return taskRepository.findById(id).map(task -> {
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
            return taskRepository.save(task);
        });
    }
    
}
