import { useEffect } from "react";
import useGetUser from "../features/authentication/useGetUser";
import { useNavigate } from "react-router-dom";

function Guard({ children }) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUser();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/login");
    }
  }, [data, isLoading]);
  return children;
}

export default Guard;
