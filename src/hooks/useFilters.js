import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined)
    throw new Error("useFilters used outside of FilterProvider");
  return context;
}
