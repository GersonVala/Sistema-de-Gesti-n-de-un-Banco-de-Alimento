// como viene una organizacion desde la api (igual al modelo del back)
export interface Organizacion {
  _id: string;
  nombre: string;
  direccion: string;
  telefono?: string;
  personasAsistidas: number;
}

// PENDIENTE: el back todavia no tiene la ruta /api/organizaciones
// cuando este, aca va la llamada a la api y la pantalla no cambia. mientras tanto devuelve vacio
export async function obtenerOrganizaciones(): Promise<Organizacion[]> {
  return [];
}
