import { useEffect, useState } from "react";
import { Card, Flex, Input, Table, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";
import {
  ESTADO_CAMPANIA,
  estadoCampania,
  obtenerCampanias,
  type Campania,
  type EstadoCampania,
  type Voluntario,
} from "../services/campanias";
import { formatearFecha } from "../utils/fechas";

// texto y color de cada estado ("default" = gris en antd)
const ESTILO_ESTADO: Record<EstadoCampania, { texto: string; color: string }> = {
  [ESTADO_CAMPANIA.PROXIMA]: { texto: "Próxima", color: "blue" },
  [ESTADO_CAMPANIA.EN_CURSO]: { texto: "En curso", color: "green" },
  [ESTADO_CAMPANIA.FINALIZADA]: { texto: "Finalizada", color: "default" },
};

const COLUMNAS: TableColumnsType<Campania> = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    // la descripcion es opcional, si esta la muestro abajo del nombre en gris
    render: (nombre: string, campania) => (
      <>
        <div>{nombre}</div>
        {campania.descripcion && <Typography.Text type="secondary">{campania.descripcion}</Typography.Text>}
      </>
    ),
  },
  { title: "Lugar", dataIndex: "lugar" },
  {
    title: "Fechas",
    // no tiene dataIndex xq usa 2 campos, por eso le pongo key
    key: "fechas",
    render: (_, campania) => `${formatearFecha(campania.fechaInicio)} al ${formatearFecha(campania.fechaFin)}`,
    sorter: (a, b) => new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime(),
  },
  {
    title: "Estado",
    key: "estado",
    filters: Object.values(ESTADO_CAMPANIA).map((estado) => ({
      text: ESTILO_ESTADO[estado].texto,
      value: estado,
    })),
    onFilter: (valor, campania) => estadoCampania(campania) === valor,
    render: (_, campania) => {
      const estado = estadoCampania(campania);
      return <Tag color={ESTILO_ESTADO[estado].color}>{ESTILO_ESTADO[estado].texto}</Tag>;
    },
  },
  {
    title: "Voluntarios",
    dataIndex: "voluntarios",
    // un tag por voluntario, wrap para q bajen de renglon si no entran
    render: (voluntarios: Voluntario[]) =>
      voluntarios.length === 0 ? (
        <Typography.Text type="secondary">Sin voluntarios</Typography.Text>
      ) : (
        <Flex wrap gap={4}>
          {voluntarios.map((voluntario) => (
            <Tag key={voluntario._id}>{voluntario.nombre}</Tag>
          ))}
        </Flex>
      ),
  },
];

// listado de campañas de recoleccion con sus voluntarios
export default function Campanias() {
  const [campanias, setCampanias] = useState<Campania[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerCampanias();
      setCampanias(datos);
      setCargando(false);
    }
    cargar();
  }, []);

  const campaniasFiltradas = campanias.filter((campania) =>
    campania.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <Card title="Campañas">
      <Input.Search
        placeholder="Buscar por nombre"
        allowClear
        onChange={(evento) => setBusqueda(evento.target.value)}
        style={{ maxWidth: 300, marginBottom: 16 }}
      />
      <Table
        rowKey="_id"
        columns={COLUMNAS}
        dataSource={campaniasFiltradas}
        loading={cargando}
        pagination={{ pageSize: 5, showTotal: (total) => `${total} campañas` }}
      />
    </Card>
  );
}
