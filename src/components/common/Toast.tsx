interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900/90 px-5 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all">
      {message}
    </div>
  );
}
