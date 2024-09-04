import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueriesData(["user"], data);
      navigate("/dashboard", { replace: true });
      toast.success("Login successful!");
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoading };
}

export default useLogin;
