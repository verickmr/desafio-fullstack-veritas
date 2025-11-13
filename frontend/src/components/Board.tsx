"use client"

import React, { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { getTasks, updateTask } from "@/api"
import TaskCard from "./TaskCard"
import TaskDialog from "./TaskDialog"
import { toast } from "sonner"
import type { Task } from "@/types"
import type { DropResult } from "@hello-pangea/dnd"

const columns: Record<string, string> = {
  todo: "A Fazer",
  in_progress: "Em Progresso",
  done: "Concluídas",
}

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks()
      setTasks(data)
    } catch (err) {
      console.error(err)
      toast.error("Erro ao carregar tarefas")
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination || destination.droppableId === source.droppableId) return

    const updatedTasks = tasks.map((t) =>
      t.id === draggableId ? { ...t, status: destination.droppableId } : t
    )
    setTasks(updatedTasks)

    try {
      await updateTask(draggableId, { status: destination.droppableId })
      toast.success("Tarefa movida com sucesso!")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao mover tarefa")
      fetchTasks()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Minhas Tarefas</h2>
        <TaskDialog triggerLabel="➕ Nova Tarefa" onSuccess={fetchTasks} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([status, title]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 min-h-[480px] flex flex-col"
                >
                  <h2 className="text-lg font-medium text-center text-gray-700 border-b border-gray-200 pb-2 mb-3">
                    {title}
                  </h2>

                  <div className="flex-1">
                    {tasks
                      .filter((t) => t.status === status)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(drag) => (
                            <TaskCard
                              task={task}
                              dragInnerRef={drag.innerRef}
                              draggableProps={drag.draggableProps}
                              dragHandleProps={drag.dragHandleProps}
                              onUpdated={fetchTasks}
                            />
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
