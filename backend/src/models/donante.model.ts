import { Schema, model } from "mongoose";

// tipos de donante q pide la consigna (empresa o particular), mismo patron q ROL en usuario
export const TIPO_DONANTE = {
  EMPRESA: "EMPRESA",
  PARTICULAR: "PARTICULAR",
} as const;

// queda "EMPRESA" | "PARTICULAR"
export type TipoDonante = (typeof TIPO_DONANTE)[keyof typeof TIPO_DONANTE];

// el ? despues del nombre significa q es opcional, puede no venir
export interface IDonante {
  nombre: string;
  tipo: TipoDonante;
  email?: string;
  telefono?: string;
}

const donanteSchema = new Schema<IDonante>(
  {
    nombre: { type: String, required: true, trim: true },
    tipo: { type: String, enum: Object.values(TIPO_DONANTE), required: true },
    // email y telefono no tienen required xq son opcionales (coincide con el ? de la interface)
    email: { type: String, lowercase: true, trim: true },
    telefono: { type: String, trim: true },
  },
  { timestamps: true },
);

export const Donante = model<IDonante>("Donante", donanteSchema);
