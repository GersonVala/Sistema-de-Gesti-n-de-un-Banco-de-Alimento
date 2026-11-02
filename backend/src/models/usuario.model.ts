// traigo Schema y model de mongoose, con esto armo todo el modelo
import { Schema, model } from "mongoose";

// los roles q puede tener un usuario
// el "as const" hace q no se puedan modificar y q TS los tome como valores fijos y no como un string cualquiera
export const ROL = {
  COORDINADOR: "COORDINADOR",
  VOLUNTARIO: "VOLUNTARIO",
} as const;

// saca el tipo a partir del objeto ROL, queda "COORDINADOR" | "VOLUNTARIO"
// asi no escribo los roles 2 veces, si agrego uno arriba se actualiza solo
export type Rol = (typeof ROL)[keyof typeof ROL];

// la interface es el "plano" de un usuario, solo sirve para TS mientras programo (cuando corre desaparece)
export interface IUsuario {
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
}

// el schema es lo q usa mongoose para validar cuando guardo en la base (este si funciona en ejecucion)
// String con mayuscula es el de JS, string con minuscula es el tipo de TS, no es lo mismo
const usuarioSchema = new Schema<IUsuario>(
  {
    // required = obligatorio, trim = saca espacios del principio y el final
    nombre: { type: String, required: true, trim: true },
    // unique no es validacion de mongoose, crea un indice en mongo y si se repite tira error E11000
    // lowercase lo pasa todo a minuscula
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select false: la pass no viene cuando hago un find, para el login la pido con .select("+password")
    password: { type: String, required: true, select: false },
    // enum: solo deja guardar los valores de ROL. Object.values(ROL) da ["COORDINADOR", "VOLUNTARIO"]
    rol: { type: String, enum: Object.values(ROL), required: true },
  },
  // timestamps agrega createdAt y updatedAt solo
  { timestamps: true },
);

// el modelo, con esto hago Usuario.find(), Usuario.create(), etc
// mongoose crea la coleccion "usuarios" (lo pasa a minuscula y le agrega la s)
export const Usuario = model<IUsuario>("Usuario", usuarioSchema);
