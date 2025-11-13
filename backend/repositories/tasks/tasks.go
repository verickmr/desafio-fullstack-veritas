package tasks

import (
	"backend/models"

	"github.com/google/uuid"
)

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

func (r *Tasks) UpdateTask(id uuid.UUID, update models.UpdateTaskRequest) bool {
	for i, t := range r.tasks {
		if t.ID == id {
			if update.Title != nil {
				r.tasks[i].Title = *update.Title
			}
			if update.Description != nil {
				r.tasks[i].Description = *update.Description
			}
			if update.Status != nil {
				r.tasks[i].Status = *update.Status
			}
			if update.Priority != nil {
				r.tasks[i].Priority = *update.Priority
			}
			if update.Deadline != nil {
				r.tasks[i].Deadline = *update.Deadline
			}
			r.tasks[i].UpdatedAt = t.UpdatedAt.AddDate(0, 0, 0)
			return true
		}
	}
	return false
}

func (r *Tasks) DeleteTask(id uuid.UUID) bool {
	for i, t := range r.tasks {
		if t.ID == id {
			r.tasks = append(r.tasks[:i], r.tasks[i+1:]...)
			return true
		}
	}
	return false
}