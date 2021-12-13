import React, { useEffect, useState } from "react";
import "./Home.css";

function App() {
  const [coindata, setCoindata] = useState([]);
  useEffect(() => {
    //fetch data from temporary_data.json
    fetch("temporary_data.json")
      .then((res) => res.json())
      .then((data) => setCoindata(data));
    console.log(coindata);
  }, []);

  return (
    <div className="Home">
      <h1> Hello World!</h1>
      <table>
        <tbody>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Price</td>
            <td>1D Change</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
