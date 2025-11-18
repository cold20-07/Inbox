import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { toastSlideIn } from '../../lib/animations';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast = ({ type, message, isVisible, onClose }: ToastProps) => {
  const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <XCircle size={20} className="text-red-500" />,
    warning: <AlertCircle size={20} className="text-amber-500" />,
    info: <Info size={20} className="text-blue-500" />
  };

  const styles = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${styles[type]} min-w-[320px] max-w-md`}
          variants={toastSlideIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {icons[type]}
          <p className="flex-1 text-sm font-medium text-gray-900 dark:text-white">
            {message}
          </p>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded transition-colors"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
