import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Sign Up successful!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signUp, isLoading };
}

export default useSignUp;
