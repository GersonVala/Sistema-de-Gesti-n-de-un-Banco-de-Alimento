// el Layout de antd lo renombro a AntLayout xq mi componente tambien se llama Layout
import { Layout as AntLayout, Button, Menu, Typography } from "antd";
import {
  CarOutlined,
  DashboardOutlined,
  FlagOutlined,
  GiftOutlined,
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Sider, Header, Content } = AntLayout;

// las opciones del menu. la key es la ruta, asi al hacer click navego directo a esa key
const ITEMS_MENU = [
  { key: "/panel", icon: <DashboardOutlined />, label: "Panel" },
  { key: "/donantes", icon: <TeamOutlined />, label: "Donantes" },
  { key: "/organizaciones", icon: <HomeOutlined />, label: "Organizaciones" },
  { key: "/donaciones", icon: <GiftOutlined />, label: "Donaciones" },
  { key: "/entregas", icon: <CarOutlined />, label: "Entregas" },
  { key: "/campanias", icon: <FlagOutlined />, label: "Campañas" },
];

// el "marco" de la app: menu a la izquierda, encabezado arriba y el contenido q cambia segun la ruta
export default function Layout() {
  // useNavigate = para cambiar de ruta desde codigo
  const navigate = useNavigate();
  // useLocation = en q ruta estoy ahora (para marcar el item del menu)
  const location = useLocation();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      {/* breakpoint lg: en pantallas chicas el menu se esconde */}
      <Sider breakpoint="lg" collapsedWidth={0}>
        <div style={{ color: "#fff", padding: 16, fontWeight: 600, fontSize: 16 }}>
          Banco de Alimentos
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={ITEMS_MENU}
          // marca en verde la opcion de la ruta actual
          selectedKeys={[location.pathname]}
          // al hacer click navego a la key (q es la ruta)
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <AntLayout>
        {/* flex + space-between: titulo a la izquierda y boton a la derecha */}
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            Sistema de Gestión
          </Typography.Title>
          {/* por ahora solo vuelve al login. cuando haya JWT aca tambien se borra el token */}
          <Button icon={<LogoutOutlined />} onClick={() => navigate("/login")}>
            Cerrar sesión
          </Button>
        </Header>

        <Content style={{ margin: 24 }}>
          {/* Outlet = el "hueco" donde react router dibuja la pagina de la ruta actual */}
          {/* el menu queda fijo y solo cambia lo de aca */}
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
}
