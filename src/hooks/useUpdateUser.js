import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../services/apiAuth";
import { useNotification } from "../hooks/useNotification";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      console.log("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      notify("Profile updated successfully", "positive");
    },
    onError: (error) => {
      console.error("User update failed:", error.message);
      notify("Could not update profile", "negative");
    },
  });

  return { updateUser, isUpdating };
}
