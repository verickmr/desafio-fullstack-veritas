package tasks

import "backend/models"

type Tasks struct {
	tasks []models.Task
}

func NewTasks() *Tasks {
	return &Tasks{
		tasks: make([]models.Task, 0),
	}
}

func (r *Tasks) GetAllTasks() []models.Task {
	return r.tasks
}

func (r *Tasks) AddTask(newTask models.Task) {
	r.tasks = append(r.tasks, newTask)
}
