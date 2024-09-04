import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import useBooking from "../features/bookings/useBooking";
import ErrorMessage from "../ui/ErrorMessage";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Bookings() {
  const { isLoading, bookings, count, isError, error } = useBooking();

  if (isError) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <Row type="horizontal">
            <Heading as="h1">All bookings</Heading>
            <BookingTableOperations />
          </Row>
          <Row>
            <BookingTable bookings={bookings} count={count} />
          </Row>
        </>
      )}
    </>
  );
}

export default Bookings;
