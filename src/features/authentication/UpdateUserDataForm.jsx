import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUpdateUser from "./useUpdateUser";
import useGetUser from "./useGetUser";
import Heading from "../../ui/Heading";

function UpdateUserDataForm() {
  const { data } = useGetUser();
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { updateUserData, isLoading } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    updateUserData({
      ...(fullName.trim() !== "" && { fullName }),
      avatar,
    });
  }

  function isUnvalidInput() {
    return (
      (fullName.trim() === "" ||
        data?.user_metadata.fullName === fullName.trim()) &&
      !avatar
    );
  }

  return (
    <>
      <Heading as="h2">Update user data</Heading>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Email address">
          <Input defaultValue={data?.email} disabled />
        </FormRow>
        <FormRow label="Full name">
          <Input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            disabled={isLoading}
            defaultValue={data?.user_metadata?.fullName}
          />
        </FormRow>

        <FormRow label="Avatar image">
          <FileInput
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isLoading || isUnvalidInput()}>
            Update account
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateUserDataForm;
