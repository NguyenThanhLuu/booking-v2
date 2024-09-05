import styled from "styled-components";
import useGetUser from "./useGetUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-200);
`;

function UserAvatar() {
  const { data } = useGetUser();
  return (
    <StyledUserAvatar>
      <Avatar
        src={data?.user_metadata?.avatar || "default-user.jpg"}
        alt={`Avatar of ${data?.user_metadata?.fullName}`}
      />
      <span>{data?.user_metadata?.fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
