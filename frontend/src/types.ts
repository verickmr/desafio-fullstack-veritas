export type Status = "todo" | "in_progress" | "done"
export type Priority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  description?: string
  status: Status
  priority: Priority
  deadline?: string
  created_at: string
  updated_at: string
}
