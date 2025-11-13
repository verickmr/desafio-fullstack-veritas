package handlers

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/rs/cors"

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

	handler := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:5173"}, 
		AllowedMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowedHeaders: []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
    }).Handler(http.DefaultServeMux)
	slog.Info("listening on port", "port", port)
	return http.ListenAndServe(fmt.Sprintf(":%v", port),handler)
}
