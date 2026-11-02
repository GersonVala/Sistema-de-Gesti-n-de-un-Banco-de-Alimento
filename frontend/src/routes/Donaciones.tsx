import { useEffect, useState } from "react";
import { Card, Input, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { obtenerDonaciones, type Donacion, type LoteDonacion } from "../services/donaciones";
import { diasHasta, formatearFecha } from "../utils/fechas";

const COLUMNAS_DONACIONES: TableColumnsType<Donacion> = [
  { title: "Donante", dataIndex: "donante" },
  {
    title: "Fecha de ingreso",
    dataIndex: "fechaIngreso",
    render: (fecha: string) => formatearFecha(fecha),
    // ordeno por fecha, arranca con las mas nuevas arriba
    sorter: (a, b) => new Date(a.fechaIngreso).getTime() - new Date(b.fechaIngreso).getTime(),
    defaultSortOrder: "descend",
  },
  // cuantos lotes trajo la donacion
  { title: "Lotes", dataIndex: "lotes", render: (lotes: LoteDonacion[]) => lotes.length },
];

// la tabla de adentro: el stock de cada lote
const COLUMNAS_LOTES: TableColumnsType<LoteDonacion> = [
  { title: "Producto", dataIndex: "producto" },
  { title: "Unidad", dataIndex: "unidadMedida" },
  // cantidad = lo q se dono, disponible = lo q queda despues de las entregas
  { title: "Donado", dataIndex: "cantidad" },
  { title: "Disponible", dataIndex: "cantidadDisponible" },
  { title: "Vence", dataIndex: "fechaVencimiento", render: (fecha: string) => formatearFecha(fecha) },
  {
    title: "Faltan",
    key: "faltan",
    // rojo si vence en 3 dias o menos, naranja en una semana, verde si hay tiempo
    render: (_, lote) => {
      const dias = diasHasta(lote.fechaVencimiento);
      if (dias < 0) return <Tag color="red">Vencido</Tag>;
      const color = dias <= 3 ? "red" : dias <= 7 ? "orange" : "green";
      return <Tag color={color}>{dias} días</Tag>;
    },
  },
];

// listado de donaciones, cada una se despliega y muestra sus lotes (el stock)
export default function Donaciones() {
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerDonaciones();
      setDonaciones(datos);
      setCargando(false);
    }
    cargar();
  }, []);

  // busco por el nombre del donante
  const donacionesFiltradas = donaciones.filter((donacion) =>
    donacion.donante.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <Card title="Donaciones y stock">
      <Input.Search
        placeholder="Buscar por donante"
        allowClear
        onChange={(evento) => setBusqueda(evento.target.value)}
        style={{ maxWidth: 300, marginBottom: 16 }}
      />
      {/* expandable = cada fila tiene un + q abre una tabla con los lotes de esa donacion */}
      <Table
        rowKey="_id"
        columns={COLUMNAS_DONACIONES}
        dataSource={donacionesFiltradas}
        loading={cargando}
        pagination={{ pageSize: 5, showTotal: (total) => `${total} donaciones` }}
        expandable={{
          expandedRowRender: (donacion) => (
            <Table
              rowKey="_id"
              columns={COLUMNAS_LOTES}
              dataSource={donacion.lotes}
              pagination={false}
              size="small"
            />
          ),
        }}
      />
    </Card>
  );
}
