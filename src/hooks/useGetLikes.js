import { useQuery } from "@tanstack/react-query";
import { getLikes as getLikesApi } from "../services/apiPalettes";

export function useGetLikes() {
  const {
    data: likes,
    isLoading: isSorting,
    error,
  } = useQuery({
    queryKey: ["likes"],
    queryFn: getLikesApi,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (error) {
    console.error("Error fetching likes:", error);
  }

  return { likes, isSorting };
}
