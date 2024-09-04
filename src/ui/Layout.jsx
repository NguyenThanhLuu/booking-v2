import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = styled.main`
  background-color: var(--color-grey-0);
  overflow-y: scroll;
`;

const Container = styled.div`
  margin: 0;
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

function Layout() {
  return (
    <Container>
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default Layout;
