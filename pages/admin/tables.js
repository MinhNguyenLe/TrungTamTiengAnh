import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";
import { ContextProvider } from "src/Context";
import App from "src/App";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
      <ContextProvider>
    <App />
  </ContextProvider>
      </div>
    </>
  );
}

Tables.layout = Admin;
