import { createContext, useMemo, useState } from "react";
import Toast_ from "../Components/Toast_";
import { AnimatePresence } from "framer-motion";

type toastValue = {
  open: (message: string, variant?: string) => void;
  close: (id: number) => void;
};

type providerProps = {
  children: React.ReactNode;
};
type toastType = {
  message: string;
  id: number;
  variant?: string;
};

export const ToastContext = createContext<toastValue | null>(null);

export function ToastProvider({ children }: providerProps) {
  const [toasts, setToasts] = useState<toastType[]>([]);

  const openToast = (message: string, variant?: string) => {
    const newToast = {
      message,
      id: Date.now(),
      variant: variant,
    };
    setToasts((prevState) => {
      const updatedToasts = [...prevState, newToast].slice(-4);
      return updatedToasts;
    });
  };

  const closeToast = (id: number) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
  };

  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  );
  return (
    <>
      <ToastContext.Provider value={contextValue}>
        {children}
        <div className="fixed top-1 left-[50%] -translate-x-1/2 flex flex-col-reverse gap-2 z-[100]">
          <AnimatePresence>
            {toasts &&
              toasts.map((toast) => {
                return (
                  <Toast_
                    key={toast.id}
                    message={toast.message}
                    close={() => closeToast(toast.id)}
                    variant={toast.variant}
                  ></Toast_>
                );
              })}
          </AnimatePresence>
        </div>
      </ToastContext.Provider>
    </>
  );
}
