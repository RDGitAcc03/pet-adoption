import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
// import UserContextProvider from "./Contexts/userContext";

let arrow = document.querySelector('#arrow');
if (arrow) {
  console.log("working");
}
  // arrow.style.border = '3px solid black';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
  // </UserContextProvider>
);
