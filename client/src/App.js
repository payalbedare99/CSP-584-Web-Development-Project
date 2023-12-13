import React from "react";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/index.css";
import { router } from "./routers";

export default function App() {
  return <RouterProvider router={router} />;
}
