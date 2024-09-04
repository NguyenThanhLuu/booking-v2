import styled from "styled-components";

const Error = styled.h2`
  text-align: center;
  margin-top: 4rem;
`;

function ErrorMessage({ children }) {
  return <Error>{children}</Error>;
}

export default ErrorMessage;
