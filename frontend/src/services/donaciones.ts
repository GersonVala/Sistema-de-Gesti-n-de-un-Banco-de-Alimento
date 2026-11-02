// un lote de la donacion: un producto con UNA fecha de vencimiento (igual q en el back)
// producto y unidadMedida vienen como texto xq la api los va a mandar ya resueltos (populate)
export interface LoteDonacion {
  _id: string;
  producto: string;
  unidadMedida: string;
  cantidad: number;
  cantidadDisponible: number;
  fechaVencimiento: string;
}

// en el back la donacion no guarda los lotes (cada lote apunta a su donacion)
// la api los va a juntar y mandar todo junto, asi la pantalla los muestra adentro de cada donacion
export interface Donacion {
  _id: string;
  donante: string;
  fechaIngreso: string;
  lotes: LoteDonacion[];
}

// PENDIENTE: el back todavia no tiene la ruta /api/donaciones
// cuando este, aca va la llamada a la api y la pantalla no cambia. mientras tanto devuelve vacio
export async function obtenerDonaciones(): Promise<Donacion[]> {
  return [];
}
