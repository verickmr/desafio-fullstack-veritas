import React, { useEffect, useState } from "react";
import API from "./api";
import AddTaskModal from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    API.get("/tasks")
      .then((res) => {
        console.log("✅ Dados da API:", res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("❌ Erro na API:", err);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      {tasks.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      )}
      <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Kanban Front</h1>

      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        + Nova Tarefa
      </button>

      <AddTaskModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
    </div>
  );
}

export default App;
