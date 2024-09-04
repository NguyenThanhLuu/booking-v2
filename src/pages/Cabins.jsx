import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import useGetCabins from "../features/cabins/useGetCabins";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Cabins() {
  const [isShowForm, setIsShowForm] = useState(false);
  const { cabins, isLoading, isError, error } = useGetCabins();

  if (isError) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <CabinTableOperations />
          </Row>
          <Row>
            <CabinTable cabins={cabins} />
            <Button
              onClick={() => setIsShowForm((state) => !state)}
              variation="primary"
              size="medium"
            >
              Add new cabin
            </Button>

            {isShowForm && (
              <Modal setIsShowForm={setIsShowForm}>
                <CreateCabinForm setIsShowForm={setIsShowForm} />
              </Modal>
            )}
          </Row>
        </>
      )}
    </>
  );
}

export default Cabins;
