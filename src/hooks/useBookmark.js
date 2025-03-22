import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBookmark as toggleBookmarkApi } from "../services/apiAuth";

export function useBookmark(paletteId, user) {
  const queryClient = useQueryClient();

  // Fetch if the user has bookmarked this palette
  const { data: isBookmarked = false } = useQuery({
    queryKey: ["bookmarked", paletteId, user?.id],
    queryFn: () => user?.user_metadata?.bookmarks?.includes(paletteId) || false,
    enabled: !!user,
  });

  const { mutate: toggleBookmark, isLoading } = useMutation({
    mutationFn: () => toggleBookmarkApi(paletteId),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarked", paletteId, user?.id]); // Refresh bookmark status
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return { toggleBookmark, isLoading, isBookmarked };
}
