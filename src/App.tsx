import Header from '@/components/Header'
import TaskInput from '@/components/TaskInput'
import TaskFilters from '@/components/TaskFilters'
import TaskList from '@/components/TaskList'
import TaskStats from '@/components/TaskStats'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900">
      <div className="container max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white/40 backdrop-blur-xl shadow-xl rounded-2xl p-6 md:p-8">
          <Header />

          <main>
            <TaskInput />
            <TaskFilters />
            <TaskList />
            <TaskStats />
          </main>

        </div>
          <footer className="mt-4 text-center text-sm text-sky-50">
            <p>TodoFlow &copy; {new Date().getFullYear()}</p>
          </footer>
      </div>
    </div>
  )
}

export default App
