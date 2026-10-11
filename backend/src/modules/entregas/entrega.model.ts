import { Schema, model, type Types } from "mongoose";

// estados de una entrega. si se cancela hay q devolver el stock a los lotes
export const ESTADO_ENTREGA = {
  PENDIENTE: "PENDIENTE",
  ENTREGADA: "ENTREGADA",
  CANCELADA: "CANCELADA",
} as const;

export type EstadoEntrega = (typeof ESTADO_ENTREGA)[keyof typeof ESTADO_ENTREGA];

// cada item es "cuanto saco de q lote"
// apunta a Lote y no a Producto xq necesito saber de q lote sale para ver el vencimiento y descontar el disponible
export interface IItemEntrega {
  lote: Types.ObjectId;
  cantidad: number;
}

// IItemEntrega[] = un array de items
export interface IEntrega {
  organizacion: Types.ObjectId;
  fecha: Date;
  estado: EstadoEntrega;
  items: IItemEntrega[];
}

// schema del item. va adentro de la entrega (subdocumento), no tiene coleccion propia
// es la composicion (rombo negro) del UML: si borro la entrega se borran sus items
// _id false para q mongoose no le ponga un id a cada item, no lo necesito
const itemEntregaSchema = new Schema<IItemEntrega>(
  {
    lote: { type: Schema.Types.ObjectId, ref: "Lote", required: true },
    cantidad: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const entregaSchema = new Schema<IEntrega>(
  {
    // a q organizacion va
    organizacion: { type: Schema.Types.ObjectId, ref: "Organizacion", required: true },
    // para q dia es la entrega
    fecha: { type: Date, required: true },
    // si no le paso estado arranca en PENDIENTE
    estado: {
      type: String,
      enum: Object.values(ESTADO_ENTREGA),
      default: ESTADO_ENTREGA.PENDIENTE,
    },
    items: {
      // [itemEntregaSchema] = array de items con ese schema
      type: [itemEntregaSchema],
      // OJO: en arrays el required deja pasar [] vacio, por eso hago mi propia validacion
      // es el 1..* del diagrama, minimo un item
      validate: {
        validator: (items: IItemEntrega[]) => items.length > 0,
        message: "La entrega debe tener al menos un ítem",
      },
    },
  },
  { timestamps: true },
);

export const Entrega = model<IEntrega>("Entrega", entregaSchema);
