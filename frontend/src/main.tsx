import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "./Context/ToastProvider.tsx";
import { AuthProvider } from "./Context/AuthProvider.tsx";
import { ModalProvider } from "./Context/ModalProvider.tsx";
import { AudioProvider } from "./Context/AudioProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AudioProvider>
          <ToastProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ToastProvider>
        </AudioProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
