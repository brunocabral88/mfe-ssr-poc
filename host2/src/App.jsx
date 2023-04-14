import React from "react";
import ReactDOM from "react-dom";
import Button from 'canopy/Button';

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: host2</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <div>Button: <Button /></div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
