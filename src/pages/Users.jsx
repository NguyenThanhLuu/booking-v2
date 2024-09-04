import styled from "styled-components";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  width: 70%;
  gap: 2rem;
`;

function newUsers() {
  return (
    <LoginLayout>
      <Heading as="h1">Sign up new account</Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default newUsers;
