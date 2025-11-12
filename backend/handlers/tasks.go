package handlers

import (
	"encoding/json"
	"net/http"

	"backend/models"
)

func (h Handlers) registerRoutes() {
	http.HandleFunc("GET /tasks", h.getAllTasks)
	http.HandleFunc("POST /tasks", h.AddTask)
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