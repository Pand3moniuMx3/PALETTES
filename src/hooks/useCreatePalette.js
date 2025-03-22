import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPalette as createPaletteApi } from "../services/apiPalettes";
import { useNotification } from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { useWorkshop } from "./useWorkshop";

export function useCreatePalette() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { clearInputs } = useWorkshop();

  const { mutate: createPalette, isLoading: isCreating } = useMutation({
    mutationFn: createPaletteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["palettes"] });
      notify("Palette created successfully!", "positive");
      navigate("/app/palettes");
      clearInputs();
    },
    onError: (err) => {
      console.error(err.message);
      notify("Palette could not be created", "negative");
    },
  });

  return { createPalette, isCreating };
}
