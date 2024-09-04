import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import { getBooking } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import CheckoutButton from "../check-in-out/CheckoutButton";
import useDeleteBooking from "./useDelete";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["bookings-detail", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  const { data: booking, isLoading } = query;
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleDeleteBooking(bookingId) {
    deleteBooking(bookingId);
    moveBack();
  }

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          {!isLoading && (
            <Tag type={statusToTagName && statusToTagName[booking.status]}>
              {booking.status.replace("-", " ")}
            </Tag>
          )}
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {isLoading && <Spinner />}

      {!isLoading && <BookingDataBox booking={booking} />}

      <ButtonGroup>
        {booking?.status === "checked-in" && <CheckoutButton bookingId={id} />}
        <Modal.Open opens="delete">
          <Button variation="danger">Delete</Button>
        </Modal.Open>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      <Modal.Window name="delete">
        <ConfirmDelete
          object={booking}
          disabled={isDeleting}
          onConfirm={handleDeleteBooking}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
