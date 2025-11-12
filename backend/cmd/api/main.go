package main

import (
	"backend/handlers"
	"backend/repositories"
	"backend/usecases"
)

func main() {
	repo := repositories.NewRepository()
	usecases := usecases.NewTaskCase(repo)
	h := handlers.NewHandlers(usecases)
	h.Listen(8000)
	
}