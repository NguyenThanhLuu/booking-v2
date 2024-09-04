import { useQuery } from "@tanstack/react-query";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import { getSettings } from "../services/apiSettings";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Settings() {
  const { isLoading, data, error, isError } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });
  if (isError) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Row>
            <Heading as="h1">Settings</Heading>
          </Row>
          <Row>
            <UpdateSettingsForm settingsData={data} />
          </Row>
        </>
      )}
    </>
  );
}

export default Settings;
