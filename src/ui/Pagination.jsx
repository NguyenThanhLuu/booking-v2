import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { NUM_PAGE_ITEMS } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParam, setSearchParam] = useSearchParams();

  const currentPage = Number(searchParam.get("page")) || 1;
  const totalPage = Math.ceil(count / NUM_PAGE_ITEMS);

  function moveToNextPage() {
    const newPage = currentPage === totalPage ? currentPage : currentPage + 1;
    searchParam.set("page", newPage);
    setSearchParam(searchParam);
  }

  function moveToPreviousPage() {
    const newPage = currentPage === 1 ? currentPage : currentPage - 1;
    searchParam.set("page", newPage);
    setSearchParam(searchParam);
  }

  if (totalPage === 1) return null;
  return (
    <StyledPagination>
      <P>
        <span>
          Showing {(currentPage - 1) * NUM_PAGE_ITEMS + 1} to{" "}
          {currentPage === totalPage ? count : currentPage * NUM_PAGE_ITEMS} of{" "}
          {count} results
        </span>
      </P>
      <Buttons>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={moveToPreviousPage}
        >
          <HiChevronLeft />
          Previous
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === totalPage}
          onClick={moveToNextPage}
        >
          Next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
