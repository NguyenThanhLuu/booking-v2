import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout(bookingId) {
  const queryClient = useQueryClient();
  const { mutate: checkout } = useMutation({
    mutationFn: () =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success("Update booking's status to checked out successful! ");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () =>
      toast.error("Update booking's status to checked out failed!"),
  });
  return { checkout };
}

export default useCheckout;
