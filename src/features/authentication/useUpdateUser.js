import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserData, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User information successfully updated!");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUserData, isLoading };
}

export default useUpdateUser;
