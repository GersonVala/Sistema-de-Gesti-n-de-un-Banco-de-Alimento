// punto de entrada del front, como el index.ts del back
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
// textos de antd en español (paginacion, botones de las tablas, etc)
import esES from "antd/locale/es_ES";
import App from "./App";
import "./index.css";

// busca el <div id="root"> del index.html y ahi adentro dibuja toda la app
// el ! le dice a TS "confia, ese div existe" (sabemos q esta en el index.html)
createRoot(document.getElementById("root")!).render(
  // StrictMode solo sirve en desarrollo, avisa de errores comunes
  <StrictMode>
    {/* ConfigProvider configura antd para toda la app: idioma y color principal */}
    <ConfigProvider locale={esES} theme={{ token: { colorPrimary: "#389e0d" } }}>
      {/* BrowserRouter habilita las rutas, todo lo q este adentro puede usar Routes, useNavigate, etc */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
);
