import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import EnConstruccion from "./components/EnConstruccion";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Panel from "./routes/Panel";
import Donantes from "./routes/Donantes";

// aca estan TODAS las rutas de la app, es como el "mapa" del front
export default function App() {
  return (
    <Routes>
      {/* login va afuera del Layout para q se vea sin el menu */}
      <Route path="login" element={<Login />} />

      {/* ruta "layout": no tiene path, solo envuelve a las de adentro con el menu */}
      {/* las rutas hijas se dibujan en el <Outlet /> del Layout */}
      <Route element={<Layout />}>
        {/* index = la ruta "/" pelada, la mando al panel. replace para q no quede en el historial */}
        <Route index element={<Navigate to="/panel" replace />} />

        <Route path="panel" element={<Panel />} />
        <Route path="donantes" element={<Donantes />} />

        {/* estas todavia en construccion */}
        <Route path="organizaciones" element={<EnConstruccion titulo="Organizaciones" />} />
        <Route path="donaciones" element={<EnConstruccion titulo="Donaciones y stock" />} />
        <Route path="entregas" element={<EnConstruccion titulo="Entregas" />} />
        <Route path="campanias" element={<EnConstruccion titulo="Campañas" />} />

        {/* * = cualquier ruta q no exista arriba */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
