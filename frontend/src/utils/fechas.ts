// funciones de fechas q usan varias pantallas (panel, donaciones, entregas, campañas)
// las saco aca para no copiar lo mismo en cada archivo

// pasa la fecha ISO a formato argentino (dd/mm/aaaa)
export function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR");
}

// cuantos dias faltan para una fecha (ceil redondea para arriba)
// si ya paso da negativo
export function diasHasta(iso: string): number {
  const milisegundos = new Date(iso).getTime() - Date.now();
  return Math.ceil(milisegundos / (1000 * 60 * 60 * 24));
}
