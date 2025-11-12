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
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	t.repos.Task.AddTask(repoReq)
	return repoReq.ID, nil

}