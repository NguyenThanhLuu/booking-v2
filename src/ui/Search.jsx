import { HiMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  position: absolute;
  right: 0;
`;

function Search({ setSearchKey }) {
  return (
    <Container>
      <Input
        placeholder="Search..."
        onChange={(e) => setSearchKey(e.target.value.toLowerCase())}
      />
      <Icon>
        <HiMagnifyingGlass className="icon" />
      </Icon>
    </Container>
  );
}

export default Search;
