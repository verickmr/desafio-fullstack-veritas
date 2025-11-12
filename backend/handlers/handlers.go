package handlers

import (
	"fmt"
	"log/slog"
	"net/http"

	"backend/usecases"
)

type Handlers struct {
	 	TaskCase *usecases.TaskCase
}

func NewHandlers(usecase *usecases.TaskCase) *Handlers {
	return &Handlers{
		TaskCase: usecase,
	}
}

func (h *Handlers) Listen(port int) error{
	h.registerRoutes()
	slog.Info("listening on port", "port", port)
	return http.ListenAndServe(fmt.Sprintf(":%v", port),nil)
}
