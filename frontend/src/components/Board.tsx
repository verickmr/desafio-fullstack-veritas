"use client"

import React, { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { getTasks, updateTask, deleteTask } from "@/api"
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

  // Pega tarefas do backend
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

  // Função para mover tarefas entre colunas
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    // Atualiza localmente
    const updatedTasks = tasks.map((t) =>
      t.id === draggableId ? { ...t, status: destination.droppableId } : t
    )
    setTasks(updatedTasks)

    // Atualiza no backend (PATCH)
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quadro de Tarefas</h1>
        <TaskDialog triggerLabel="Nova Tarefa" onSuccess={fetchTasks} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([status, title]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 rounded-lg p-3 min-h-[400px]"
                >
                  <h2 className="text-lg font-semibold mb-3">{title}</h2>

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
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}