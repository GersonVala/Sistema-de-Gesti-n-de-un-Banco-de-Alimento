import { Schema, model } from "mongoose";

// el catalogo de productos (ej "Arroz 1kg"), no es el stock
// el stock real esta en Lote, esto es para q no haya "Arroz" y "arroz" como si fueran distintos
export interface IProducto {
  nombre: string;
  categoria: string;
  unidadMedida: string;
}

const productoSchema = new Schema<IProducto>(
  {
    // unique para q no se cargue 2 veces el mismo producto
    nombre: { type: String, required: true, unique: true, trim: true },
    categoria: { type: String, required: true, trim: true },
    // kg, unidad, litro, etc
    unidadMedida: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Producto = model<IProducto>("Producto", productoSchema);
