import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import UserContextProvider from "./Contexts/userContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <UserContextProvider>
    <App />
  </UserContextProvider>
  </ChakraProvider>
);

