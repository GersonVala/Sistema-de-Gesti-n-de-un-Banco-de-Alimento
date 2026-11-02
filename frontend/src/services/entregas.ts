// los estados viven aca xq son de la entrega (el panel los importa de este archivo)
export const ESTADO_ENTREGA = {
  PENDIENTE: "PENDIENTE",
  ENTREGADA: "ENTREGADA",
  CANCELADA: "CANCELADA",
} as const;

export type EstadoEntrega = (typeof ESTADO_ENTREGA)[keyof typeof ESTADO_ENTREGA];

// cada item es "cuanto saco de q lote", igual q en el back
// lote es el id (sirve de key en la tabla), producto y unidad vienen resueltos por la api
export interface ItemEntrega {
  lote: string;
  producto: string;
  unidadMedida: string;
  cantidad: number;
}

export interface Entrega {
  _id: string;
  organizacion: string;
  fecha: string;
  estado: EstadoEntrega;
  items: ItemEntrega[];
}

// PENDIENTE: el back todavia no tiene la ruta /api/entregas
// cuando este, aca va la llamada a la api y la pantalla no cambia. mientras tanto devuelve vacio
export async function obtenerEntregas(): Promise<Entrega[]> {
  return [];
}
