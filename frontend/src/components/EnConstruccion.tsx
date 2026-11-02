import { Result } from "antd";
import { ToolOutlined } from "@ant-design/icons";

// las props q recibe el componente, es como los parametros de una funcion
interface EnConstruccionProps {
  titulo: string;
}

// cartel para las secciones q todavia no estan hechas
// es reutilizable: lo uso en varias rutas y cada una le pasa su titulo
// { titulo } saca la prop titulo directo (desestructuracion)
export default function EnConstruccion({ titulo }: EnConstruccionProps) {
  return (
    <Result
      icon={<ToolOutlined />}
      title={titulo}
      subTitle="Esta sección está en construcción."
    />
  );
}
