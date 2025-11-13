// src/components/TaskCard.tsx
"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TaskDialog from "./TaskDialog"
import type { Task } from "@/types"


function formatDate(iso?: string) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
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
  return (
    <div
      ref={dragInnerRef as any}
      {...(draggableProps || {})}
      {...(dragHandleProps || {})}
    >
      <Card className="p-3 mb-2 bg-white shadow-sm hover:shadow-md transition cursor-grab">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
            {task.description ? (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            ) : null}

            <div className="text-xs text-gray-400 mt-2">
              <span>Criado: {formatDate(task.created_at)}</span>
              <span className="mx-2">•</span>
              <span>Atualizado: {formatDate(task.updated_at)}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <TaskDialog
              task={task}
              triggerLabel="Editar"
              onSuccess={onUpdated}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
