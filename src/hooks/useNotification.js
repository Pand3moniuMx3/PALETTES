import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined)
    throw new Error("useNotification used outside of NotificationProvider");
  return context;
}
