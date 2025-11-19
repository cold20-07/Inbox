import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './components/ui/ToastContainer'
import ErrorBoundary from './components/ErrorBoundary'
import NuclearLanding from './pages/NuclearLanding'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import DiagnosticPage from './pages/DiagnosticPage'

const queryClient = new QueryClient()

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NuclearLanding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/diagnostics" element={<DiagnosticPage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
