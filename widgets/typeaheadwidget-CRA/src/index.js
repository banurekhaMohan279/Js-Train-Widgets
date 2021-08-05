import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Typeahead from "./Typeahead";
import Typeahead_fetch from "./Typeaheadfetch";
import cities from "./list.js";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Typeahead cities={cities} />
    <Typeahead_fetch cities={cities} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
