import { useEffect, useState } from "react";
import { Card, Input, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
  ESTADO_ENTREGA,
  obtenerEntregas,
  type Entrega,
  type EstadoEntrega,
  type ItemEntrega,
} from "../services/entregas";
import { formatearFecha } from "../utils/fechas";

// texto y color de cada estado. Record obliga a q esten TODOS los estados, si agrego uno TS avisa
const ESTILO_ESTADO: Record<EstadoEntrega, { texto: string; color: string }> = {
  [ESTADO_ENTREGA.PENDIENTE]: { texto: "Pendiente", color: "gold" },
  [ESTADO_ENTREGA.ENTREGADA]: { texto: "Entregada", color: "green" },
  [ESTADO_ENTREGA.CANCELADA]: { texto: "Cancelada", color: "red" },
};

const COLUMNAS_ENTREGAS: TableColumnsType<Entrega> = [
  { title: "Organización", dataIndex: "organizacion" },
  {
    title: "Fecha",
    dataIndex: "fecha",
    render: (fecha: string) => formatearFecha(fecha),
    sorter: (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
    defaultSortOrder: "descend",
  },
  {
    title: "Estado",
    dataIndex: "estado",
    // armo las opciones del filtro a partir de los estados, asi no los escribo 2 veces
    filters: Object.values(ESTADO_ENTREGA).map((estado) => ({
      text: ESTILO_ESTADO[estado].texto,
      value: estado,
    })),
    onFilter: (valor, entrega) => entrega.estado === valor,
    render: (estado: EstadoEntrega) => (
      <Tag color={ESTILO_ESTADO[estado].color}>{ESTILO_ESTADO[estado].texto}</Tag>
    ),
  },
  { title: "Ítems", dataIndex: "items", render: (items: ItemEntrega[]) => items.length },
];

// la tabla de adentro: q se lleva de cada lote
const COLUMNAS_ITEMS: TableColumnsType<ItemEntrega> = [
  { title: "Producto", dataIndex: "producto" },
  { title: "Cantidad", dataIndex: "cantidad" },
  { title: "Unidad", dataIndex: "unidadMedida" },
];

// listado de entregas a las organizaciones, cada una se despliega y muestra sus items
export default function Entregas() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerEntregas();
      setEntregas(datos);
      setCargando(false);
    }
    cargar();
  }, []);

  // busco por el nombre de la organizacion
  const entregasFiltradas = entregas.filter((entrega) =>
    entrega.organizacion.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <Card title="Entregas">
      <Input.Search
        placeholder="Buscar por organización"
        allowClear
        onChange={(evento) => setBusqueda(evento.target.value)}
        style={{ maxWidth: 300, marginBottom: 16 }}
      />
      <Table
        rowKey="_id"
        columns={COLUMNAS_ENTREGAS}
        dataSource={entregasFiltradas}
        loading={cargando}
        pagination={{ pageSize: 5, showTotal: (total) => `${total} entregas` }}
        expandable={{
          // los items no tienen _id (en el back es _id false), uso el id del lote como key
          expandedRowRender: (entrega) => (
            <Table
              rowKey="lote"
              columns={COLUMNAS_ITEMS}
              dataSource={entrega.items}
              pagination={false}
              size="small"
            />
          ),
        }}
      />
    </Card>
  );
}
