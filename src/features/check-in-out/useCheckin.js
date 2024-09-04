import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckin() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, addBreakfast, optionalBreakfastPrice, totalPrice }) => {
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
        totalPrice: addBreakfast
          ? optionalBreakfastPrice + totalPrice
          : totalPrice,
        extrasPrice: addBreakfast ? optionalBreakfastPrice : 0,
        hasBreakfast: addBreakfast,
      });
    },
    onSuccess: () => {
      toast.success("Checkin successful!");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("Checkin failed!");
    },
  });

  return { mutate, isLoading };
}

export default useCheckin;
