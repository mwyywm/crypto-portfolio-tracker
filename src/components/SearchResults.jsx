import React from "react";
import "./searchresults.css";

const SearchResults = React.forwardRef(
  ({ data, onClick, showResults }, ref) => {
    return (
      <div
        className="results-container"
        ref={ref}
        tabIndex="-1"
        style={
          showResults & (data.length > 0)
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <ul>
          {data.map((result, i) => (
            <li
              key={result.name}
              className="coin-search-result"
              onClick={onClick}
            >
              <img src={result.thumb} alt={result.name} />
              <p>{result.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default SearchResults;
