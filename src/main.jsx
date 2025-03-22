import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
import { FilterProvider } from "./context/FilterContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FilterProvider>
      <App />
    </FilterProvider>
  </StrictMode>
);
