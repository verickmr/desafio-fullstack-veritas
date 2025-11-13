package usecases

import (
	"time"

	"github.com/google/uuid"
	"backend/models"
	"backend/repositories"
)



type TaskCase struct {
	repos *repositories.Repositories
}

func NewTaskCase(repos *repositories.Repositories) *TaskCase {
	return &TaskCase{
		repos: repos,
	}
}

func (t TaskCase) GetAllTasks() []models.Task {
	tasks := t.repos.Task.GetAllTasks()
	return tasks
}

func (t TaskCase) AddTask(newTask models.CreateTaskRequest) (uuid.UUID, error) {
	repoReq := models.Task{
		ID: uuid.New(),
		Title:       newTask.Title,
		Description: newTask.Description,
		Status:      newTask.Status,
		Priority:    newTask.Priority,
		Deadline:    newTask.Deadline,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	t.repos.Task.AddTask(repoReq)
	return repoReq.ID, nil

}

func (t TaskCase) UpdateTask(id uuid.UUID, update models.UpdateTaskRequest) bool {
	return t.repos.Task.UpdateTask(id, update)
}

func (t TaskCase) DeleteTask(id uuid.UUID) bool {
	return t.repos.Task.DeleteTask(id)
}