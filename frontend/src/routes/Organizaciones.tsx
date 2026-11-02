import { useEffect, useState } from "react";
import { Card, Input, Table } from "antd";
import type { TableColumnsType } from "antd";
import { obtenerOrganizaciones, type Organizacion } from "../services/organizaciones";

const COLUMNAS: TableColumnsType<Organizacion> = [
  { title: "Nombre", dataIndex: "nombre" },
  { title: "Dirección", dataIndex: "direccion" },
  // telefono es opcional, si no esta muestro un guion
  { title: "Teléfono", dataIndex: "telefono", render: (telefono?: string) => telefono ?? "-" },
  {
    title: "Personas asistidas",
    dataIndex: "personasAsistidas",
    // sorter = flechitas en la cabecera para ordenar de menor a mayor o al reves
    sorter: (a, b) => a.personasAsistidas - b.personasAsistidas,
  },
];

// listado de organizaciones q reciben las entregas (comedores, merenderos, etc)
export default function Organizaciones() {
  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  // pido las organizaciones una sola vez al abrir la pantalla
  useEffect(() => {
    async function cargar() {
      const datos = await obtenerOrganizaciones();
      setOrganizaciones(datos);
      setCargando(false);
    }
    cargar();
  }, []);

  // mismo filtro por nombre q en donantes
  const organizacionesFiltradas = organizaciones.filter((organizacion) =>
    organizacion.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <Card title="Organizaciones">
      <Input.Search
        placeholder="Buscar por nombre"
        allowClear
        onChange={(evento) => setBusqueda(evento.target.value)}
        style={{ maxWidth: 300, marginBottom: 16 }}
      />
      <Table
        rowKey="_id"
        columns={COLUMNAS}
        dataSource={organizacionesFiltradas}
        loading={cargando}
        pagination={{ pageSize: 5, showTotal: (total) => `${total} organizaciones` }}
      />
    </Card>
  );
}
