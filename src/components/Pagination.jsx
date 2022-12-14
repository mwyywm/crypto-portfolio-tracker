import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./pagination.css";

export const Pagination = () => {
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

  useEffect(() => {
    // resetting the pagination state to 1 when we navigate to the page without '?pg=' params
    if (!searchParams.has("pg")) {
      setPage(1);
    }
  }, [searchParams]);

  return (
    <div className="pagination">
      {/* Render 'Previous' button, won't render when we are at first page */}
      {page > 1 && (
        <button
          className="previous-button"
          onClick={() => {
            setPage((state) => parseInt(state) - 1);
            scrollTo(top);
          }}
        >
          {"<"}
        </button>
      )}
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1;

        if (pageNumber >= start && pageNumber <= end) {
          return (
            <button
              key={i}
              onClick={() => {
                setPage(pageNumber);
                scrollTo(top);
              }}
            >
              {pageNumber}
            </button>
          );
        }
        return null;
      })}

      {/* Render 'Next' button, won't render when we are at last page */}
      {page < totalPages && (
        <button
          className="next-button"
          onClick={() => {
            setPage((state) => parseInt(state) + 1);
            scrollTo(top);
          }}
        >
          {">"}
        </button>
      )}
    </div>
  );
};
