import { format, isToday } from "date-fns";
import styled from "styled-components";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Tag from "../../ui/Tag";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  color: var(--color-grey-600);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
  columns,
}) {
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const bookingDeletedInfo = { id: bookingId, name: "booking" };

  const { checkout } = useCheckout(bookingId);
  const { mutate: mutateDelete, isLoading: isDeleting } = useDeleteBooking();

  return (
    <TableRow columns={columns} role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See details
              </Menus.Button>

              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}

              {status === "checked-in" && (
                <Menus.Button icon={<HiArrowUpOnSquare />} onClick={checkout}>
                  Check out
                </Menus.Button>
              )}

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Menus>

        <Modal.Window name="delete">
          <ConfirmDelete
            object={bookingDeletedInfo}
            disabled={isDeleting}
            onConfirm={mutateDelete}
          />
        </Modal.Window>
      </Modal>
    </TableRow>
  );
}

export default BookingRow;
