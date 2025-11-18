import { createContext } from 'react';
import { ToastType } from '../components/ui/Toast';

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
