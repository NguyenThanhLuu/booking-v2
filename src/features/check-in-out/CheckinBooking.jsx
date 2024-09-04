import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import { getBooking } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import useCheckin from "./useCheckin";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { getSettings } from "../../services/apiSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { id } = useParams();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const query = useQuery({
    queryKey: ["checkin", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  const setting = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
    retry: false,
  });

  const { data: settingData = {} } = setting;
  const { data: booking = {}, isLoading } = query;
  const { breakfastPrice } = settingData;
  const { guests, numGuests, numNights, hasBreakfast, totalPrice } = booking;
  const { mutate: onCheckin } = useCheckin();
  const moveBack = useMoveBack();
  const optionalBreakfastPrice = breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    onCheckin({ id, addBreakfast, optionalBreakfastPrice, totalPrice });
    moveBack();
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      {isLoading && <Spinner />}
      {!isLoading && <BookingDataBox booking={booking} />}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid} onClick={handleCheckin}>
          Check in booking #{id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
