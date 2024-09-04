import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDuplicate() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: duplicateCabin,
    onSuccess: () => {
      toast.success("Duplicate cabin successful!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isLoading };
}

export default useDuplicate;
