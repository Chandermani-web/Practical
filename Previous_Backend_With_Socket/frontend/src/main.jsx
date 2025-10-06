import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./Context/UseContext.jsx";
import { SocketProvider } from "./Context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  </AppProvider>
);
