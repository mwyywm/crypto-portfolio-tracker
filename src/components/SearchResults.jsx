import react from "react";
import "./searchresults.css";

export default function SearchResults({ data, onSelect }) {
  return (
    <div className="results-container">
      {data.map((result) => (
        <div key={result.id} className="coin-search-result">
          <img src={result.thumb} alt={result.name} />
          <p>{result.name}</p>
        </div>
      ))}
    </div>
  );
}
