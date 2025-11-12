package models
import "time"


import "github.com/google/uuid"
type Status string

const (
	StatusTodo     Status = "todo"
	StatusProgress Status = "in_progress"
	StatusDone     Status = "done"
)

type Task struct {
	ID          uuid.UUID    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description,omitempty"`
	Status      Status    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CreateTaskRequest struct {
	Title       string    `json:"title"`
	Description string    `json:"description,omitempty"`
	Status      Status    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

type CreateTaskResponse struct {
	NewTaskId uuid.UUID `json:"NewTaskId"`
}