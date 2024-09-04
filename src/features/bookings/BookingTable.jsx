import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";

function BookingTable({ bookings, count }) {
  const columnRatio = "0.6fr 2fr 2fr 1fr 1fr 3rem";
  const tableBookings = bookings;

  return (
    <Table role="table" columns={columnRatio}>
      <Table.Header role="row">
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={tableBookings}
        render={(booking) => (
          <BookingRow
            columns={columnRatio}
            key={booking.id}
            booking={booking}
          />
        )}
      ></Table.Body>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
