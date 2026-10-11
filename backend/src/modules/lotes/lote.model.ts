import { Schema, model, type Types } from "mongoose";

// el lote es el stock de verdad: un producto con UNA fecha de vencimiento
// asi se sabe q de los 100 arroz, 10 vencen mañana y 20 en 50 dias (son lotes distintos)
export interface ILote {
  donacion: Types.ObjectId;
  producto: Types.ObjectId;
  cantidad: number;
  cantidadDisponible: number;
  fechaVencimiento: Date;
}

const loteSchema = new Schema<ILote>(
  {
    // de q donacion vino y q producto es
    donacion: { type: Schema.Types.ObjectId, ref: "Donacion", required: true },
    producto: { type: Schema.Types.ObjectId, ref: "Producto", required: true },
    // cantidad = lo q se dono (no cambia). min 1 xq no tiene sentido un lote de 0
    cantidad: { type: Number, required: true, min: 1 },
    // cantidadDisponible = lo q queda, baja cuando se arma una entrega. min 0 para q nunca quede negativo
    cantidadDisponible: { type: Number, required: true, min: 0 },
    // con esto se controla q no se entregue vencido y el panel de "proximos a vencer"
    fechaVencimiento: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Lote = model<ILote>("Lote", loteSchema);
