import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: (data) => {
      toast.success("Delete successful!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error("Delete failed: ", err.message);
    },
  });
  return { mutate, isLoading };
}

export default useDeleteCabin;
