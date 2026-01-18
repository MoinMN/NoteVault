import { AxiosError, isAxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

interface ErrorData {
  msg?: string;
  success?: boolean;
}

type AlertType = "success" | "error" | "warning" | "info";

type AlertState = {
  message: string;
  type?: AlertType;
} | null;

const ErrorCatch = (
  error: unknown,
  setAlert: Dispatch<SetStateAction<AlertState>>
) => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorData>;
    const serverMsg = axiosError.response?.data?.msg;

    setAlert({
      message: serverMsg || error.message || "Network Error",
      type: "error"
    });
  } else {
    setAlert({
      message: error instanceof Error ? error.message : "An unexpected error occurred",
      type: "error"
    });
  }
}

export default ErrorCatch;