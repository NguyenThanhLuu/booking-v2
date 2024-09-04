import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";

function useGetCabins() {
  const {
    data: cabins = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  return { cabins, isLoading, isError, error };
}

export default useGetCabins;
