import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Button from "./Button";

const App = () => (
  <div className="container">
    <div>Name: remote</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <Button />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
