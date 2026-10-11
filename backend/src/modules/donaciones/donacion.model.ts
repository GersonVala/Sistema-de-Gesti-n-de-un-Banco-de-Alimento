// "type Types" se importa asi xq solo lo uso como tipo, no como valor (lo pide verbatimModuleSyntax)
import { Schema, model, type Types } from "mongoose";

// la donacion es solo la "cabecera": quien dono y cuando
// los productos con cantidad y vencimiento van en Lote (cada lote apunta a su donacion)
export interface IDonacion {
  // Types.ObjectId = el id de otro documento, aca el del donante
  donante: Types.ObjectId;
  fechaIngreso: Date;
}

const donacionSchema = new Schema<IDonacion>(
  {
    // ref: "Donante" le dice a mongoose a q modelo apunta este id (despues sirve para el populate)
    // es la flecha del UML, el id se guarda en este lado
    donante: { type: Schema.Types.ObjectId, ref: "Donante", required: true },
    // si no le paso fecha pone la de hoy
    fechaIngreso: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

// ojo: mongoose pluraliza en ingles, la coleccion queda "donacions"
export const Donacion = model<IDonacion>("Donacion", donacionSchema);
