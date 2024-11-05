import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import Stat from "./Stat";

const Container = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-evenly;
`;

function Stats({ bookings, confirmedStays }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;

  return (
    <Container>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
    </Container>
  );
}

export default Stats;
