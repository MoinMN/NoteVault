import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type AlertState = {
  message: string;
  type?: AlertType;
} | null;

type AlertContextType = {
  alert: AlertState;
  setAlert: Dispatch<SetStateAction<AlertState>>;
};

const AlertContext = createContext({} as AlertContextType);

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>(null);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
