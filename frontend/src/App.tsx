import React, { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [tasks, setTasks] = useState([]);

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
    </div>
  );
}

export default App;
