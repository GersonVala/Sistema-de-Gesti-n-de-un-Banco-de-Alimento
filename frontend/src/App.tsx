import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import EnConstruccion from "./components/EnConstruccion";
import NotFound from "./routes/NotFound";

// aca estan TODAS las rutas de la app, es como el "mapa" del front
export default function App() {
  return (
    <Routes>
      {/* ruta "layout": no tiene path, solo envuelve a las de adentro con el menu */}
      {/* las rutas hijas se dibujan en el <Outlet /> del Layout */}
      <Route element={<Layout />}>
        {/* index = la ruta "/" pelada, la mando al panel. replace para q no quede en el historial */}
        <Route index element={<Navigate to="/panel" replace />} />

        {/* por ahora todas en construccion, el panel y donantes se llenan en el paso 4 */}
        <Route path="panel" element={<EnConstruccion titulo="Panel del coordinador" />} />
        <Route path="donantes" element={<EnConstruccion titulo="Donantes" />} />
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
