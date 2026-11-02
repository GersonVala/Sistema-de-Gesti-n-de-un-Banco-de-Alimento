import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// los datos q devuelve el formulario, asi TS sabe q me llega en onFinish
interface LoginForm {
  email: string;
  password: string;
}

// pantalla de login, va fuera del Layout (sin menu, pantalla completa)
export default function Login() {
  const navigate = useNavigate();

  // onFinish SOLO se ejecuta si pasan todas las reglas de validacion
  // LOGIN SIMULADO: todavia no hay endpoint de login en el back, por ahora entra directo al panel
  // cuando hagamos JWT aca va la llamada a la api con email y password
  // el _ en _valores es xq por ahora no los uso (sino TS se queja)
  const onFinish = (_valores: LoginForm) => {
    navigate("/panel");
  };

  return (
    // div q centra la tarjeta en el medio de la pantalla
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 360 }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Banco de Alimentos
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ textAlign: "center" }}>
          Ingresá con tu cuenta
        </Typography.Paragraph>

        {/* <LoginForm> le dice al form q forma tienen los datos */}
        {/* layout vertical = label arriba del input */}
        <Form<LoginForm> layout="vertical" onFinish={onFinish} requiredMark={false}>
          {/* name = como se llama el campo en los datos, rules = las validaciones */}
          {/* si falla una regla muestra el message en rojo abajo del input */}
          <Form.Item<LoginForm>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Ingresá tu email" },
              { type: "email", message: "El email no es válido" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="tu@email.com" />
          </Form.Item>

          <Form.Item<LoginForm>
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Ingresá tu contraseña" },
              { min: 6, message: "Mínimo 6 caracteres" },
            ]}
          >
            {/* Input.Password oculta lo q escribis y tiene el ojito para verla */}
            <Input.Password prefix={<LockOutlined />} placeholder="••••••" />
          </Form.Item>

          <Form.Item>
            {/* htmlType submit = al tocarlo envia el form (y ahi se validan las reglas) */}
            {/* block = ocupa todo el ancho */}
            <Button type="primary" htmlType="submit" block>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
