import { RESUMEN_PANEL_EJEMPLO } from "./datosEjemplo";

export const ESTADO_ENTREGA = {
  PENDIENTE: "PENDIENTE",
  ENTREGADA: "ENTREGADA",
  CANCELADA: "CANCELADA",
} as const;

export type EstadoEntrega = (typeof ESTADO_ENTREGA)[keyof typeof ESTADO_ENTREGA];

// cuanto hay de cada producto (suma de los lotes no vencidos)
export interface StockProducto {
  producto: string;
  unidadMedida: string;
  cantidad: number;
}

// las fechas vienen como texto (asi llegan en el JSON de la api), despues las convierto para mostrarlas
export interface EntregaProxima {
  _id: string;
  organizacion: string;
  fecha: string;
  estado: EstadoEntrega;
}

export interface LoteAVencer {
  _id: string;
  producto: string;
  cantidadDisponible: number;
  fechaVencimiento: string;
}

// todo lo q muestra el panel del coordinador (lo q pide la consigna)
export interface ResumenPanel {
  stock: StockProducto[];
  proximasEntregas: EntregaProxima[];
  lotesPorVencer: LoteAVencer[];
}

// HOY: datos de ejemplo. DESPUES: llamada a la api, la pantalla no cambia
export async function obtenerResumenPanel(): Promise<ResumenPanel> {
  return RESUMEN_PANEL_EJEMPLO;
}
