import * as React from "react";
import MUIPagination from "@material-ui/lab/Pagination";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}): JSX.Element => {
  return (
    <MUIPagination
      count={totalPages}
      page={currentPage}
      color="primary"
      onChange={(event: Object, page: number) => handlePageChange(page)}
      shape="rounded"
    />
  );
};

export default Pagination;
