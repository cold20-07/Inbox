import { useState, useCallback, ReactNode } from 'react';
import Toast, { ToastType } from './Toast';
import { ToastContext } from '../../contexts/ToastContext';

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  isVisible: boolean;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: ToastData = { id, type, message, isVisible: true };
    
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, isVisible: false } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, duration);
  }, []);

  const handleClose = useCallback((id: string) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, isVisible: false } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[600] flex flex-col gap-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => handleClose(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
