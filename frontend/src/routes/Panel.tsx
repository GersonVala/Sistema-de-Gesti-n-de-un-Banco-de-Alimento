import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
  obtenerResumenPanel,
  type EntregaProxima,
  type LoteAVencer,
  type ResumenPanel,
  type StockProducto,
} from "../services/panel";

// pasa la fecha ISO a formato argentino (dd/mm/aaaa)
function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR");
}

// cuantos dias faltan para una fecha (ceil redondea para arriba)
function diasHasta(iso: string): number {
  const milisegundos = new Date(iso).getTime() - Date.now();
  return Math.ceil(milisegundos / (1000 * 60 * 60 * 24));
}

// columnas de cada tabla. dataIndex = q campo del objeto muestra
const COLUMNAS_STOCK: TableColumnsType<StockProducto> = [
  { title: "Producto", dataIndex: "producto" },
  { title: "Cantidad", dataIndex: "cantidad" },
  { title: "Unidad", dataIndex: "unidadMedida" },
];

const COLUMNAS_ENTREGAS: TableColumnsType<EntregaProxima> = [
  { title: "Organización", dataIndex: "organizacion" },
  // render = como mostrar el valor, aca la fecha formateada en vez del texto ISO
  { title: "Fecha", dataIndex: "fecha", render: (fecha: string) => formatearFecha(fecha) },
  { title: "Estado", dataIndex: "estado", render: (estado: string) => <Tag color="gold">{estado}</Tag> },
];

const COLUMNAS_VENCER: TableColumnsType<LoteAVencer> = [
  { title: "Producto", dataIndex: "producto" },
  { title: "Cantidad", dataIndex: "cantidadDisponible" },
  { title: "Vence", dataIndex: "fechaVencimiento", render: (fecha: string) => formatearFecha(fecha) },
  {
    title: "Faltan",
    dataIndex: "fechaVencimiento",
    // rojo si vence en 3 dias o menos, naranja si no
    render: (fecha: string) => {
      const dias = diasHasta(fecha);
      return <Tag color={dias <= 3 ? "red" : "orange"}>{dias} días</Tag>;
    },
  },
];

// panel del coordinador: stock disponible, proximas entregas y productos proximos a vencer
export default function Panel() {
  // useState = dato q cuando cambia hace q react vuelva a dibujar la pantalla
  // arranca en null xq al principio todavia no hay datos
  const [resumen, setResumen] = useState<ResumenPanel | null>(null);

  // useEffect con [] al final = se ejecuta UNA vez cuando aparece la pantalla
  // aca pido los datos (hoy de ejemplo, despues a la api)
  useEffect(() => {
    async function cargar() {
      const datos = await obtenerResumenPanel();
      setResumen(datos);
    }
    cargar();
  }, []);

  // mientras resumen es null las tablas muestran el "cargando"
  const cargando = resumen === null;

  return (
    <>
      {/* fila de 3 tarjetas con numeros. xs=24 en celu ocupa todo el ancho, md=8 en compu un tercio */}
      {/* no sumo las cantidades de stock xq hay kg, litros y unidades mezclados, cuento productos */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Productos con stock" value={resumen?.stock.length ?? 0} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Entregas próximas" value={resumen?.proximasEntregas.length ?? 0} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            {/* en antd 6 el color del numero va en styles.content (valueStyle quedo viejo) */}
            <Statistic
              title="Lotes por vencer (7 días)"
              value={resumen?.lotesPorVencer.length ?? 0}
              styles={{ content: { color: "#cf1322" } }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Stock disponible" style={{ marginTop: 16 }}>
        {/* rowKey = campo unico de cada fila (react lo necesita para las listas) */}
        <Table
          rowKey="producto"
          columns={COLUMNAS_STOCK}
          dataSource={resumen?.stock}
          loading={cargando}
          pagination={false}
          size="small"
        />
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Próximas entregas">
            <Table
              rowKey="_id"
              columns={COLUMNAS_ENTREGAS}
              dataSource={resumen?.proximasEntregas}
              loading={cargando}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Productos próximos a vencer">
            <Table
              rowKey="_id"
              columns={COLUMNAS_VENCER}
              dataSource={resumen?.lotesPorVencer}
              loading={cargando}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
