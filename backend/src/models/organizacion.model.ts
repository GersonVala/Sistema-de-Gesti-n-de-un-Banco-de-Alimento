import { Schema, model } from "mongoose";

// las organizaciones q reciben las entregas (comedores, merenderos, etc)
export interface IOrganizacion {
  nombre: string;
  direccion: string;
  telefono?: string;
  personasAsistidas: number;
}

const organizacionSchema = new Schema<IOrganizacion>(
  {
    nombre: { type: String, required: true, trim: true },
    direccion: { type: String, required: true, trim: true },
    telefono: { type: String, trim: true },
    // cuantas personas asiste, lo pide la consigna. min 1 xq si asiste 0 no tiene sentido
    personasAsistidas: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

// ojo: tambien queda "organizacions" por lo de pluralizar en ingles
export const Organizacion = model<IOrganizacion>("Organizacion", organizacionSchema);
