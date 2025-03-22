import { useContext } from "react";
import { WorkshopContext } from "../context/WorkshopContext";

export function useWorkshop() {
  const context = useContext(WorkshopContext);
  if (context === undefined)
    throw new Error("useWorkshop used outside of WorkshopProvider");
  return context;
}
