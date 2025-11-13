
# Desafio Fullstack - Mini Kanban de Tarefas

## 📝 Descrição

Mini Kanban desenvolvido em **React + TypeScript + Vite** no frontend e **Go** no backend. Permite criar, listar, atualizar e excluir tarefas distribuídas em três colunas:

* **A Fazer**
* **Em Progresso**
* **Concluídas**

O projeto utiliza **Tailwind CSS** para UI e **shadcn/ui** para componentes como modal e forms. Validações de formulário feitas com **Zod** e **React Hook Form**.

---

## 🚀 Tecnologias

* Frontend: React, TypeScript, Vite, Tailwind, shadcn/ui, React Hook Form, Zod
* Backend: Go (REST API com Gorilla Mux ou handlers simples)
* Comunicação: Axios
* Persistência: Memória (opcional: JSON)

---

## ⚡ Funcionalidades

* Adicionar tarefas (título obrigatório, descrição opcional, status)
* Editar tarefas
* Mover tarefas entre colunas
* Excluir tarefas
* Modal para criação de tarefas
* Select para escolher status
* Feedback de sucesso/erro ao criar tarefa

---

## 🛠️ Instalação e Execução

### Backend (Go)

```bash
cd backend
cd cmd
cd api
go run main.go
```

Servidor escuta em `http://localhost:8000`

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Aplicação escuta em `http://localhost:5173`

---
