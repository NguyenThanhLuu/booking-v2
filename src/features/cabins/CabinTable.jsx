import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";

function CabinTable({ cabins }) {
  const columnRatio = "1fr 1.8fr 2.2fr 1fr 1fr 3rem";
  const [searchParams] = useSearchParams();
  const discountSearchValue = searchParams.get("discount");
  const [sortField, sortType] = searchParams.get("sortBy")?.split("-") || [];

  let tableCabins = cabins;

  switch (discountSearchValue) {
    case "no-discount":
      tableCabins = cabins.filter((val) => !val.discount);
      break;
    case "with-discount":
      tableCabins = cabins.filter((val) => val.discount);
      break;
    default:
  }

  if (sortField) {
    tableCabins = tableCabins.sort((a, b) =>
      sortType === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField]
    );
  }

  return (
    <Table role="table" columns={columnRatio}>
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={tableCabins}
        render={(cabin) => (
          <CabinRow columns={columnRatio} key={cabin.id} cabin={cabin} />
        )}
      ></Table.Body>
      <Table.Footer></Table.Footer>
    </Table>
  );
}

export default CabinTable;
