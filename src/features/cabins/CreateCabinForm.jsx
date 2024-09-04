import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import useAddNewOrEdit from "./useAddNewOrEdit";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ editedCabinData, setIsShowForm }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { mutate, isLoading } = useAddNewOrEdit(editedCabinData);

  function onSubmit(collectedData) {
    const sendData = {
      ...collectedData,
      image: collectedData.image[0]
        ? collectedData.image[0]
        : editedCabinData.image,
      ...(editedCabinData && { id: editedCabinData.id }),
    };
    mutate(sendData, {
      onSuccess: () => {
        reset();
        setIsShowForm(false);
      },
    });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          defaultValue={editedCabinData?.name || ""}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required!",
          })}
        />
        {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={editedCabinData?.maxCapacity || ""}
          {...register("maxCapacity", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors?.maxCapacity?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          defaultValue={editedCabinData?.regularPrice || ""}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required!",
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors?.regularPrice?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          defaultValue={editedCabinData?.discount || 0}
          id="discount"
          {...register("discount", {
            required: "This field is required!",
            validate: (val) =>
              +val <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue={editedCabinData?.description || ""}
          {...register("description", {
            required: "This field is required!",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors?.description?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: editedCabinData?.image
              ? false
              : "This field is required!",
          })}
        />
        {errors?.image?.message && <Error>{errors?.image?.message}</Error>}
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => setIsShowForm?.(false)}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {editedCabinData ? "Update" : "Add"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
