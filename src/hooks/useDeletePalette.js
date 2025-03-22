import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePalette as deletePaletteApi } from "../services/apiPalettes";
import { useNotification } from "../hooks/useNotification";

export function useDeletePalette() {
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  const { mutate: deletePalette, isLoading: isDeleting } = useMutation({
    mutationFn: async (paletteId) => {
      return deletePaletteApi(paletteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["palettes"] });
      notify(
        "Palette deleted successfully. Reload page to see changes",
        "positive"
      );
    },
    onError: (err) => {
      console.error("Mutation error:", err.message);
      notify("Palette could not be deleted", "negative");
    },
  });

  return { deletePalette, isDeleting };
}
