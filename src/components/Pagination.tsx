import * as React from "react";
import MUIPagination from "@material-ui/lab/Pagination";
import { useCitiesState, useCitiesDispatch } from "../context/CitiesContext";

const Pagination: React.FC = (): JSX.Element => {
  const { totalPages } = useCitiesState();
  const currentPageDispatch = useCitiesDispatch();

  const handlePageChange = (pageNumber: number) => {
    currentPageDispatch({ type: "setCurrentPage", currentPage: pageNumber });
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <MUIPagination
      count={totalPages}
      color="primary"
      onChange={(event: Object, page: number) => handlePageChange(page)}
      shape="rounded"
    />
  );
};

export default Pagination;
