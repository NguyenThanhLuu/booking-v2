import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import useUpdateUser from "./useUpdateUser";
import useCheckAdmin from "./useCheckAdmin";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUserData, isUpdating } = useUpdateUser();
  const isNormalUser = useCheckAdmin();

  function onSubmit({ password }) {
    updateUserData({ password }, { onSuccess: () => reset() });
  }

  return (
    <>
      <Heading as="h2">Update password</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Confirm password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isUpdating || isNormalUser}>Update password</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default UpdatePasswordForm;
