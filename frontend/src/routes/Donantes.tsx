import { useEffect, useState } from "react";
import { Card, Input, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { obtenerDonantes, TIPO_DONANTE, type Donante, type TipoDonante } from "../services/donantes";

const COLUMNAS: TableColumnsType<Donante> = [
  { title: "Nombre", dataIndex: "nombre" },
  {
    title: "Tipo",
    dataIndex: "tipo",
    // filters = las opciones del filtro q aparece en la cabecera de la columna
    filters: [
      { text: "Empresa", value: TIPO_DONANTE.EMPRESA },
      { text: "Particular", value: TIPO_DONANTE.PARTICULAR },
    ],
    // onFilter = q filas quedan cuando elegis una opcion
    onFilter: (valor, donante) => donante.tipo === valor,
    render: (tipo: TipoDonante) =>
      tipo === TIPO_DONANTE.EMPRESA ? <Tag color="blue">Empresa</Tag> : <Tag color="green">Particular</Tag>,
  },
  // si no tiene email o telefono muestro un guion (son opcionales)
  { title: "Email", dataIndex: "email", render: (email?: string) => email ?? "-" },
  { title: "Teléfono", dataIndex: "telefono", render: (telefono?: string) => telefono ?? "-" },
];

// listado de donantes con paginacion y filtros (lo pide la consigna en al menos un listado)
export default function Donantes() {
  const [donantes, setDonantes] = useState<Donante[]>([]);
  const [cargando, setCargando] = useState(true);
  // lo q se escribe en el buscador
  const [busqueda, setBusqueda] = useState("");

  // pido los donantes una sola vez al abrir la pantalla
  useEffect(() => {
    async function cargar() {
      const datos = await obtenerDonantes();
      setDonantes(datos);
      setCargando(false);
    }
    cargar();
  }, []);

  // filtro por nombre: se recalcula cada vez q cambia la busqueda (no hace falta otro estado)
  // toLowerCase en los dos lados para q no importen mayusculas
  const donantesFiltrados = donantes.filter((donante) =>
    donante.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <Card title="Donantes">
      {/* allowClear = cruz para borrar lo escrito */}
      <Input.Search
        placeholder="Buscar por nombre"
        allowClear
        onChange={(evento) => setBusqueda(evento.target.value)}
        style={{ maxWidth: 300, marginBottom: 16 }}
      />
      {/* pagination: de a 5 por pagina y muestra el total abajo */}
      {/* por ahora la paginacion la hace el front, cuando este la api la va a hacer el back */}
      <Table
        rowKey="_id"
        columns={COLUMNAS}
        dataSource={donantesFiltrados}
        loading={cargando}
        pagination={{ pageSize: 5, showTotal: (total) => `${total} donantes` }}
      />
    </Card>
  );
}
