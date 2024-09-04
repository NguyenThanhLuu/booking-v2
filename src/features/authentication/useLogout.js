import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutUser, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logoutUser, isLoading };
}

export default useLogout;
