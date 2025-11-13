package models

import (
	"time"
	"github.com/google/uuid"
)

type Status string

const (
	StatusTodo     Status = "todo"
	StatusProgress Status = "in_progress"
	StatusDone     Status = "done"
)

type Priority string

const (
	PriorityLow    Priority = "low"
	PriorityMedium Priority = "medium"
	PriorityHigh   Priority = "high"
)

type Task struct {
	ID          uuid.UUID    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description,omitempty"`
	Status      Status    `json:"status"`
	Priority    Priority  `json:"priority"`
	Deadline    time.Time `json:"deadline,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CreateTaskRequest struct {
	Title       string    `json:"title"`
	Description string    `json:"description,omitempty"`
	Status      Status    `json:"status"`
	Priority    Priority  `json:"priority"`
	Deadline    time.Time `json:"deadline,omitempty"`	
}

type UpdateTaskRequest struct {
	Title       *string    `json:"title,omitempty"`
	Description *string    `json:"description,omitempty"`
	Status      *Status    `json:"status,omitempty"`
	Priority    *Priority  `json:"priority,omitempty"`
	Deadline    *time.Time `json:"deadline,omitempty"`
}

type CreateTaskResponse struct {
	NewTaskId uuid.UUID `json:"NewTaskId"`
}