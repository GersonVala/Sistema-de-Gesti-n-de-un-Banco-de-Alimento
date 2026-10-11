import { Schema, model, type Types } from "mongoose";

// campañas de recoleccion (ej en la puerta de un super) y los voluntarios q van
// le puse Campania sin ñ para no tener problemas en el codigo
export interface ICampania {
  nombre: string;
  descripcion?: string;
  lugar: string;
  fechaInicio: Date;
  fechaFin: Date;
  // array de ids de usuarios
  voluntarios: Types.ObjectId[];
}

const campaniaSchema = new Schema<ICampania>(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    lugar: { type: String, required: true, trim: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    // relacion muchos a muchos: una campaña tiene muchos voluntarios y un voluntario puede ir a muchas campañas
    // el array lo guardo de este lado
    // q sean rol VOLUNTARIO no se puede validar aca, hay q consultar los usuarios, va en el service
    voluntarios: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
  },
  { timestamps: true },
);

export const Campania = model<ICampania>("Campania", campaniaSchema);
