// Point d'entrée de l'application React.
// On monte le composant App dans le div#root du HTML.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // StrictMode : active des avertissements supplémentaires en développement
  <StrictMode>
    <App />
  </StrictMode>
);
