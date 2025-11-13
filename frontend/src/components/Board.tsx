"use client"

import { useEffect, useState } from "react"
import { getTasks, updateTask } from "@/api"
import Dialog from "./TaskDialog"
import TaskCard from "./TaskCard"
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd"
import type { DropResult } from "@hello-pangea/dnd"


export default function Board() {
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const res = await getTasks()
    setTasks(res.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const columns = {
    todo: "A Fazer",
    in_progress: "Em Progresso",
    done: "Concluídas",
  }

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result

    if (!destination || destination.droppableId === source.droppableId) return

    const taskId = result.draggableId
    const newStatus = destination.droppableId

    try {
      await updateTask(taskId, { status: newStatus })
      fetchTasks()
    } catch (err) {
      console.error("Erro ao mover tarefa:", err)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kanban</h1>
        <Dialog triggerLabel="+ Nova Tarefa" onSuccess={fetchTasks} />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(columns).map(([status, label]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-3 rounded-lg min-h-[400px]"
                >
                  <h2 className="text-lg font-semibold mb-2">{label}</h2>

                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <TaskCard
                            task={task}
                            onUpdated={fetchTasks}
                            dragInnerRef={provided.innerRef as any}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
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
