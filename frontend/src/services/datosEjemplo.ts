// DATOS DE EJEMPLO, todos juntos aca
// son de prueba mientras el back no tenga las rutas. cuando este la api se borra este archivo
// "import type" xq solo uso los tipos, no codigo
import type { Donante } from "./donantes";
import type { ResumenPanel } from "./panel";

// fecha de hoy + n dias, en texto ISO (como la mandaria la api)
// asi "vence en 3 dias" siempre tiene sentido, sin importar el dia q se abra la app
function diasDesdeHoy(dias: number): string {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString();
}

// 12 donantes para q la tabla tenga varias paginas (de a 5)
export const DONANTES_EJEMPLO: Donante[] = [
  { _id: "d1", nombre: "Supermercado El Ahorro", tipo: "EMPRESA", email: "donaciones@elahorro.com", telefono: "11 4555-1200" },
  { _id: "d2", nombre: "María González", tipo: "PARTICULAR", email: "maria.gonzalez@mail.com" },
  { _id: "d3", nombre: "Distribuidora Norte SA", tipo: "EMPRESA", email: "contacto@dnorte.com", telefono: "11 4777-8800" },
  { _id: "d4", nombre: "Juan Pérez", tipo: "PARTICULAR", telefono: "11 6123-4567" },
  { _id: "d5", nombre: "Panadería La Espiga", tipo: "EMPRESA", email: "laespiga@mail.com", telefono: "11 4321-0099" },
  { _id: "d6", nombre: "Lucía Fernández", tipo: "PARTICULAR", email: "lucia.f@mail.com" },
  { _id: "d7", nombre: "Lácteos La Pradera", tipo: "EMPRESA", email: "ventas@lapradera.com", telefono: "11 4988-3300" },
  { _id: "d8", nombre: "Carlos Romero", tipo: "PARTICULAR", telefono: "11 5876-1122" },
  { _id: "d9", nombre: "Frigorífico del Sur", tipo: "EMPRESA", email: "rrhh@frigosur.com" },
  { _id: "d10", nombre: "Ana Martínez", tipo: "PARTICULAR", email: "ana.martinez@mail.com", telefono: "11 6990-4411" },
  { _id: "d11", nombre: "Almacén Don Pedro", tipo: "EMPRESA", telefono: "11 4200-7788" },
  { _id: "d12", nombre: "Sofía Ramírez", tipo: "PARTICULAR", email: "sofi.ramirez@mail.com" },
];

export const RESUMEN_PANEL_EJEMPLO: ResumenPanel = {
  stock: [
    { producto: "Arroz 1kg", unidadMedida: "unidad", cantidad: 100 },
    { producto: "Fideos 500g", unidadMedida: "unidad", cantidad: 85 },
    { producto: "Leche larga vida 1L", unidadMedida: "litro", cantidad: 60 },
    { producto: "Aceite 900ml", unidadMedida: "unidad", cantidad: 24 },
    { producto: "Harina 1kg", unidadMedida: "unidad", cantidad: 40 },
    { producto: "Lentejas 400g", unidadMedida: "unidad", cantidad: 32 },
  ],
  proximasEntregas: [
    { _id: "e1", organizacion: "Comedor Los Peques", fecha: diasDesdeHoy(1), estado: "PENDIENTE" },
    { _id: "e2", organizacion: "Merendero Rayito de Sol", fecha: diasDesdeHoy(3), estado: "PENDIENTE" },
    { _id: "e3", organizacion: "Hogar San José", fecha: diasDesdeHoy(6), estado: "PENDIENTE" },
  ],
  // el ejemplo del arroz q hablamos: de los 100, 10 vencen mañana y 20 en unos dias
  lotesPorVencer: [
    { _id: "l1", producto: "Arroz 1kg", cantidadDisponible: 10, fechaVencimiento: diasDesdeHoy(1) },
    { _id: "l2", producto: "Leche larga vida 1L", cantidadDisponible: 12, fechaVencimiento: diasDesdeHoy(2) },
    { _id: "l3", producto: "Arroz 1kg", cantidadDisponible: 20, fechaVencimiento: diasDesdeHoy(5) },
    { _id: "l4", producto: "Harina 1kg", cantidadDisponible: 8, fechaVencimiento: diasDesdeHoy(7) },
  ],
};
