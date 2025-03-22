import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/useNotification";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/app", { replace: true });
      notify("Login successful!", "positive");
    },
    onError: (err) => {
      console.log("ERROR", err);
      notify("Login failed", "negative");
    },
  });

  return { login, isLoading };
}
