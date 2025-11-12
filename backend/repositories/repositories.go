package repositories

import (
	"backend/models"
	"backend/repositories/tasks"
)

type Repositories struct {
	Task interface {
		GetAllTasks() []models.Task
		AddTask(newTask models.Task) 
	}
}

func NewRepository() *Repositories {
	return &Repositories{
		Task: tasks.NewTasks(),
	}
}