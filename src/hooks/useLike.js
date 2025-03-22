import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toggleLikePalette,
  hasUserLikedPalette,
} from "../services/apiPalettes";

export function useLike(paletteId, userId) {
  const queryClient = useQueryClient();

  // Check if the user has already liked the palette
  const { data: hasLiked = false } = useQuery({
    queryKey: ["hasLiked", paletteId, userId],
    queryFn: () => hasUserLikedPalette(paletteId, userId),
    enabled: !!userId,
  });

  const { mutate: toggleLike, isLoading } = useMutation({
    mutationFn: () => toggleLikePalette(paletteId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", paletteId]); // Refresh like count
      queryClient.invalidateQueries(["hasLiked", paletteId, userId]); // Refresh like status
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return { toggleLike, isLoading, hasLiked };
}
