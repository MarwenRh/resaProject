import './home.css';
import './App.css';
import FirstPage from './home';
import React from "react";
import { ByPropertyType } from './ByPropertyType';


function MiddleSection() {
  return (
    <div className="App">
      <FirstPage /> 
      <br></br>
      <br></br>
     <ByPropertyType/>
    </div>
  );
}

export { MiddleSection };