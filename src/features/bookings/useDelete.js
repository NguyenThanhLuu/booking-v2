import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Deleted booking successful!");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("Detele booking failed!"),
  });
  return { mutate, isLoading };
}

export default useDeleteBooking;
