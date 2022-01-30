import React from "react";
import "./searchresults.css";

const SearchResults = React.forwardRef(
  ({ data, onClick, showResults }, ref) => {
    return (
      <div
        className="results-container"
        ref={ref}
        style={showResults ? { display: "block" } : { display: "none" }}
      >
        {data.map((result) => (
          <div
            key={result.name}
            className="coin-search-result"
            onClick={onClick}
          >
            <img src={result.thumb} alt={result.name} />
            <p>{result.name}</p>
          </div>
        ))}
      </div>
    );
  }
);

export default SearchResults;
