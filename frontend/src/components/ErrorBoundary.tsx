import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="bg-white border-8 border-black p-12 max-w-2xl shadow-brutal-color">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="w-16 h-16 text-chaos" strokeWidth={3} />
              <h1 className="text-5xl font-display">OOPS!</h1>
            </div>
            
            <p className="text-2xl font-body mb-6">
              Something went wrong. The app crashed unexpectedly.
            </p>
            
            {this.state.error && (
              <div className="bg-gray-100 border-4 border-black p-4 mb-6 font-mono text-sm overflow-auto">
                {this.state.error.message}
              </div>
            )}
            
            <button
              onClick={() => window.location.href = '/'}
              className="group relative"
            >
              <div className="absolute inset-0 bg-hotpink translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              <div className="relative bg-black text-white px-8 py-4 text-2xl font-display border-4 border-black">
                GO HOME →
              </div>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
