import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useDuplicate from "./useDuplicate";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  color: var(--color-grey-600);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const Img = styled.img`
  display: block;
  margin: 1rem 2rem;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 1rem;
  outline-offset: 0.2rem;
  outline: 1px solid var(--color-grey-300);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin, columns }) {
  const {
    id: cabinId,
    image,
    name,
    description,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  const duplicatedCabinData = {
    image,
    name: `duplicate of ${name}`,
    description,
    maxCapacity,
    regularPrice,
    discount,
  };

  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const { mutate: deleteCabin, isLoading: isDeleting } = useDeleteCabin();
  const { mutate: mutateDuplicate, isLoading: isDuplicating } = useDuplicate();

  return (
    <Modal>
      <TableRow columns={columns} role="row">
        <Img src={image} alt={description} />
        <Cabin>{name}</Cabin>
        <p>Fits up {maxCapacity} guests</p>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {+discount === 0 ? <>--</> : formatCurrency(discount)}
        </Discount>

        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={() => mutateDuplicate(duplicatedCabinData)}
              >
                Duplicate
              </Menus.Button>

              <Menus.Button
                icon={<HiPencil />}
                onClick={() => setIsShowEditForm(true)}
              >
                Edit
              </Menus.Button>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Menus>
      </TableRow>

      {isShowEditForm && (
        <Modal setIsShowForm={setIsShowEditForm}>
          <CreateCabinForm
            editedCabinData={cabin}
            setIsShowForm={setIsShowEditForm}
          />
        </Modal>
      )}

      <Modal.Window name="delete">
        <ConfirmDelete
          object={cabin}
          disabled={isDeleting}
          onConfirm={deleteCabin}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CabinRow;
