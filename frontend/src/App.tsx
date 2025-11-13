import { Toaster } from "sonner"
import Board from "@/components/Board"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <header className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            🗂️ <span>KANBAM</span>
          </h1>
          <span className="text-sm text-gray-500">React + Go Kanban</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <Board />
      </main>

      <Toaster richColors position="top-right" />
    </div>
  )
}
