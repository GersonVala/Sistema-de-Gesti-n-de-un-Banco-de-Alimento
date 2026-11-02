// mismo patron q en el back: objeto con los valores + tipo sacado del objeto
export const TIPO_DONANTE = {
  EMPRESA: "EMPRESA",
  PARTICULAR: "PARTICULAR",
} as const;

export type TipoDonante = (typeof TIPO_DONANTE)[keyof typeof TIPO_DONANTE];

// como viene un donante desde la api (igual al modelo del back)
// _id con guion bajo xq asi lo devuelve mongo
export interface Donante {
  _id: string;
  nombre: string;
  tipo: TipoDonante;
  email?: string;
  telefono?: string;
}

// la pantalla llama a esta funcion y no sabe de donde salen los datos
// PENDIENTE: el back todavia no tiene la ruta /api/donantes
// cuando este, aca va la llamada a la api y la pantalla no cambia. mientras tanto devuelve vacio
// es async xq una llamada a la api tarda, asi la pantalla ya la usa con await desde ahora
export async function obtenerDonantes(): Promise<Donante[]> {
  return [];
}
