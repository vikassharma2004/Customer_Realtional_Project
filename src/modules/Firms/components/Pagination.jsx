import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total / showPerPage);

//   useEffect(() => {
//     const start = (currentPage - 1) * showPerPage;
//     const end = start + showPerPage;
//     onPaginationChange(start, end);
//   }, [currentPage, onPaginationChange, showPerPage]);

  return (
    <div className="flex items-center justify-center space-x-3">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      >
        Prev
      </Button>
      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? "default" : "outline"}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
