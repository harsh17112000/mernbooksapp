import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import Context from "./components/contextProvider/Context";

ReactDOM.render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>,
  document.getElementById('root')
);

