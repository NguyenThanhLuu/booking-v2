import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUpdate from "./useUpdate";

function UpdateSettingsForm({ settingsData }) {
  const {
    breakfastPrice,
    maxGuestsPerBooking,
    maxBookingLength,
    minBookingLength,
  } = settingsData;

  function updateField(e, fieldName) {
    const { value } = e.target;
    if (!value) return;
    mutate({ [fieldName]: value });
  }

  const { isLoading, mutate } = useUpdate();
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isLoading}
          defaultValue={minBookingLength}
          type="number"
          id="min-nights"
          onBlur={(e) => updateField(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isLoading}
          defaultValue={maxBookingLength}
          type="number"
          id="max-nights"
          onBlur={(e) => updateField(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isLoading}
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
          onBlur={(e) => updateField(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isLoading}
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
          onBlur={(e) => updateField(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
