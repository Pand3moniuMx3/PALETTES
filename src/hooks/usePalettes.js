import { useQuery } from "@tanstack/react-query";
import { getPalettes as getPalettesApi } from "../services/apiPalettes";

export function usePalettes() {
  const {
    data: palettes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["palettes"],
    queryFn: getPalettesApi,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (error) {
    console.error("Error fetching palettes:", error);
  }

  return { palettes, isLoading };
}
