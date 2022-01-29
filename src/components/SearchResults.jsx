import react from "react";
import "./searchresults.css";

export default function SearchResults({ data, onClick }) {
  return (
    <div className="results-container">
      {data.map((result) => (
        <div key={result.name} className="coin-search-result" onClick={onClick}>
          <img src={result.thumb} alt={result.name} />
          <p>{result.name}</p>
        </div>
      ))}
    </div>
  );
}
