import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Row>
        <Heading as="h1">Update your account</Heading>
      </Row>
      <Row>
        <UpdateUserDataForm />
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
