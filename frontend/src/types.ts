// src/types.ts
export type Status = "todo" | "in_progress" | "done"

export interface Task {
  id: string // uuid.UUID como string
  title: string
  description?: string
  status: Status
  created_at: string // ISO string vinda do backend
  updated_at: string // ISO string
}

// Request/Response (conforme seu backend Go)
export interface CreateTaskRequest {
  title: string
  description?: string
  status: Status
  created_at?: string // opcional: geralmente o backend define
}

export interface CreateTaskResponse {
  NewTaskId: string // uuid as string
}
