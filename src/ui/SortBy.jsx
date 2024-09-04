import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-200)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function sort(e) {
    searchParams.set("sortBy", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect type="white" onChange={sort}>
      {options.map((val) => (
        <option value={val.value} key={val.value}>
          {val.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default SortBy;
