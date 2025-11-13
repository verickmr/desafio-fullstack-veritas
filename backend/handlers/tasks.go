package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"backend/models"

	"github.com/google/uuid"
)

func (h Handlers) registerRoutes() {
	http.HandleFunc("GET /tasks", h.getAllTasks)
	http.HandleFunc("POST /tasks", h.AddTask)
	http.HandleFunc("PATCH /tasks/", h.UpdateTask)
	http.HandleFunc("DELETE /tasks/", h.DeleteTask)
}

func (h Handlers) getAllTasks(w http.ResponseWriter, r *http.Request) {
	tasks:= h.TaskCase.GetAllTasks()
	w.WriteHeader(http.StatusOK)	
	json.NewEncoder(w).Encode(tasks)
}

func (h Handlers) AddTask(w http.ResponseWriter, r *http.Request) {
	var req models.CreateTaskRequest
	if 	err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Reason: err.Error()})
		return
	}
	id, err := h.TaskCase.AddTask(req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.ErrorResponse{Reason: err.Error()})

		return 
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(models.CreateTaskResponse{NewTaskId: id})
}

func (h Handlers) UpdateTask(w http.ResponseWriter, r *http.Request) {
	taskIdStr := strings.TrimPrefix(r.URL.Path, "/tasks/")
    
    id, err := uuid.Parse(taskIdStr)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(models.ErrorResponse{Reason: "invalid task id"})
        return
    }

	var req models.UpdateTaskRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(models.ErrorResponse{Reason: err.Error()})
        return
    }

	updated := h.TaskCase.UpdateTask(id, req)
	if !updated {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(models.ErrorResponse{Reason: "Task not found"})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "Task updated successfully"}) 
}

func (h Handlers) DeleteTask(w http.ResponseWriter, r *http.Request) {
	 taskIdStr := strings.TrimPrefix(r.URL.Path, "/tasks/")

    id, err := uuid.Parse(taskIdStr)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(models.ErrorResponse{Reason: "invalid task id"})
        return
    }

	deleted := h.TaskCase.DeleteTask(id)
	if !deleted {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(models.ErrorResponse{Reason: "Task not found"})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "Task deleted successfully"}) 
}