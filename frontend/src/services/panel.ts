import type { EstadoEntrega } from "./entregas";

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

// PENDIENTE: el back todavia no tiene la ruta del resumen
// cuando este, aca va la llamada a la api y la pantalla no cambia. mientras tanto devuelve todo vacio
export async function obtenerResumenPanel(): Promise<ResumenPanel> {
  return { stock: [], proximasEntregas: [], lotesPorVencer: [] };
}
