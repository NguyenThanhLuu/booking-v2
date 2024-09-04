import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout } = useCheckout(bookingId);
  return (
    <Button onClick={checkout} variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
