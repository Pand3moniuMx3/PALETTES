import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/useNotification";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      notify("Logged out. See you later!", "positive");
    },
  });

  return { logout, isLoading };
}
