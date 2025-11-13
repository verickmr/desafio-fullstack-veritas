package repositories

import (
	"backend/models"
	"backend/repositories/tasks"

	"github.com/google/uuid"
)

type Repositories struct {
	Task interface {
		GetAllTasks() []models.Task
		AddTask(newTask models.Task) 
		UpdateTask(id uuid.UUID, updatedTask models.UpdateTaskRequest) bool
		DeleteTask(id uuid.UUID) bool
	}
}

func NewRepository() *Repositories {
	return &Repositories{
		Task: tasks.NewTasks(),
	}
}