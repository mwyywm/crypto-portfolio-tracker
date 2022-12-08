import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Pagination = () => {
  // TODO: Store currentPage state in the URL
  // range of buttons to show
  const BUTTON_AMOUNT = 10;
  const totalPages = 100;
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    searchParams.get("pg") ? searchParams.get("pg") : 1
  );
  const start = Math.max(1, page - Math.floor(BUTTON_AMOUNT / 2));
  const end = Math.min(totalPages, start + BUTTON_AMOUNT - 1);

  useEffect(() => {
    setSearchParams(`pg=${page}`);
  }, [page]);

  return (
    <div
      className="pagination"
      style={{
        display: "flex",
        width: "400px",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      {/* Render 'Previous' button */}
      {page > 0 && (
        <button
          className="previous-button"
          onClick={() => setPage((state) => state - 1)}
        >
          Previous
        </button>
      )}
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1;

        if (pageNumber >= start && pageNumber <= end) {
          return (
            <button
              style={{ maxWidth: "40px", maxHeight: "40px" }}
              key={i}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }
        return null;
      })}

      {/* Render 'Next' button */}
      {page < totalPages && (
        <button
          className="next-button"
          onClick={() => setPage((state) => state + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};
