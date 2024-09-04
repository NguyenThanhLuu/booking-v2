import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useAddNewOrEdit(editedCabinData) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: editedCabinData ? updateCabin : addNewCabin,
    onSuccess: () => {
      toast.success(
        editedCabinData
          ? "Edited cabin successful!"
          : "Added new cabin successful!"
      );
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

export default useAddNewOrEdit;
