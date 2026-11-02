import { diasHasta } from "../utils/fechas";

// el estado de la campaña NO se guarda en la base, se calcula con las fechas
// asi nunca queda desactualizado (no hay q acordarse de cambiarlo a mano)
export const ESTADO_CAMPANIA = {
  PROXIMA: "PROXIMA",
  EN_CURSO: "EN_CURSO",
  FINALIZADA: "FINALIZADA",
} as const;

export type EstadoCampania = (typeof ESTADO_CAMPANIA)[keyof typeof ESTADO_CAMPANIA];

// en el back voluntarios es un array de ids de Usuario
// la api los va a mandar con el nombre (populate) para poder mostrarlos
export interface Voluntario {
  _id: string;
  nombre: string;
}

export interface Campania {
  _id: string;
  nombre: string;
  descripcion?: string;
  lugar: string;
  fechaInicio: string;
  fechaFin: string;
  voluntarios: Voluntario[];
}

// si ya termino es finalizada, si todavia no empezo es proxima, sino esta en curso
export function estadoCampania(campania: Campania): EstadoCampania {
  if (diasHasta(campania.fechaFin) < 0) return ESTADO_CAMPANIA.FINALIZADA;
  if (diasHasta(campania.fechaInicio) > 0) return ESTADO_CAMPANIA.PROXIMA;
  return ESTADO_CAMPANIA.EN_CURSO;
}

// PENDIENTE: el back todavia no tiene la ruta /api/campanias
// cuando este, aca va la llamada a la api y la pantalla no cambia. mientras tanto devuelve vacio
export async function obtenerCampanias(): Promise<Campania[]> {
  return [];
}
