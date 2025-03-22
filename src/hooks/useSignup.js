import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiAuth";
import { useNotification } from "../hooks/useNotification";

export function useSignup() {
  const { notify } = useNotification();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      notify("Signup successful. Verification email sent.", "positive");
    },
    onError: (err) => {
      console.error(err);
      notify("Signup failed", "negative");
    },
  });

  return { signup, isLoading };
}
