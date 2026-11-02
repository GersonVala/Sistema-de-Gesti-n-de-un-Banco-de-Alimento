import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

// pagina 404, se muestra cuando la ruta no existe (el path="*" de App.tsx)
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="La página que buscás no existe."
      extra={
        <Button type="primary" onClick={() => navigate("/panel")}>
          Volver al panel
        </Button>
      }
    />
  );
}
