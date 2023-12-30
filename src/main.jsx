import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

/*
 Note: After removing the comment tag in React that enforces strict mode,
       I've noticed an occurrence where the API is being called twice instead 
       of once. This behavior was not observed when the tag was active 
       during the development phase. Your feedback on this matter would be 
       greatly appreciated.
*/
