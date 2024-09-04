import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllBookings } from "../../services/apiBookings";
import { NUM_PAGE_ITEMS } from "../../utils/constants";
import { useEffect } from "react";

function useBooking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filter = {
    field: "status",
    value: searchParams.get("status") || "all",
  };

  const sort = {
    field: "sortBy",
    value: searchParams.get("sortBy"),
  };

  const page = {
    field: "page",
    value: Number(searchParams.get("page")) || 1,
  };

  const query = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getAllBookings({ filter, sort, page }),
  });

  useEffect(() => {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }, []);

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
    isError,
  } = query;

  if (page.value > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, { ...page, value: page.value - 1 }],
      queryFn: () =>
        getAllBookings({
          filter,
          sort,
          page: { ...page, value: page.value - 1 },
        }),
    });
  }

  if (page.value < Math.ceil(count / NUM_PAGE_ITEMS)) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, { ...page, value: page.value + 1 }],
      queryFn: () =>
        getAllBookings({
          filter,
          sort,
          page: { ...page, value: page.value + 1 },
        }),
    });
  }
  return { isLoading, bookings, count, error, isError };
}

export default useBooking;
