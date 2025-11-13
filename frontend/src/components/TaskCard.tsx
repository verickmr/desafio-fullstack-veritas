"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TaskDialog from "./TaskDialog"
import { toast } from "sonner"
import { deleteTask } from "@/api"
import type { Task } from "@/types"

const priorityColors: Record<string, string> = {
  low: "border-l-4 border-l-green-400",
  medium: "border-l-4 border-l-yellow-400",
  high: "border-l-4 border-l-red-500",
}

function formatDate(iso?: string) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleDateString("pt-BR")
}

interface TaskCardProps {
  task: Task
  onUpdated?: () => void
  dragInnerRef?: (el: HTMLElement | null) => void
  draggableProps?: any
  dragHandleProps?: any
}

export default function TaskCard({
  task,
  onUpdated,
  dragInnerRef,
  draggableProps,
  dragHandleProps,
}: TaskCardProps) {
  const handleDelete = async () => {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return

    try {
      await deleteTask(task.id)
      toast.success("Tarefa deletada com sucesso!")
      onUpdated?.()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao deletar tarefa.")
    }
  }

  return (
    <div ref={dragInnerRef as any} {...draggableProps} {...dragHandleProps}>
      <Card
        className={`p-3 mb-3 bg-white shadow-sm hover:shadow-md transition cursor-grab ${priorityColors[task.priority]}`}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{task.title}</h3>

            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}

            {task.deadline && (
              <p className="text-xs text-gray-400 mt-2">
                Prazo: {formatDate(task.deadline)}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <TaskDialog
              task={task}
              triggerLabel="Editar"
              onSuccess={onUpdated}
            />

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              Deletar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
