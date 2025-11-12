import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api";
import { useState } from "react";

// 🎯 Schema de validação com Zod
const taskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done"]).default("todo"),
});

type TaskForm = z.infer<typeof taskSchema>;

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: { status: "todo" },
  });

  const onSubmit = async (data: TaskForm) => {
    setLoading(true);
    try {
      await api.post("/tasks", data);
      alert("✅ Tarefa criada com sucesso!");
      reset();
      onClose();
    } catch (err) {
      alert("❌ Erro ao criar tarefa");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <label className="flex flex-col">
            <span className="text-sm">Título</span>
            <input
              {...register("title")}
              className="border p-2 rounded"
              placeholder="Ex: Implementar Kanban"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-sm">Descrição</span>
            <textarea
              {...register("description")}
              className="border p-2 rounded resize-none"
              rows={3}
              placeholder="Detalhes (opcional)"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded mt-3 hover:bg-blue-700 transition"
          >
            {loading ? "Enviando..." : "Salvar"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="text-gray-500 text-sm mt-3 hover:underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
