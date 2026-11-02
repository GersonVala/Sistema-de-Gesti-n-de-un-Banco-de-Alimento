import mongoose from "mongoose";
import { env } from "./env.js";

// conecta mongoose con mongo atlas usando la uri del .env
// es async xq conectarse por internet tarda y hay q esperar a q termine (await)
// si falla tira error y lo agarra index.ts
export async function conectarDB(): Promise<void> {
  await mongoose.connect(env.MONGO_URI);
  // muestro el nombre de la base para chequear q no quedo en "test" (pasa si no pusiste /banco-alimentos en la uri)
  console.log(`Conectado a MongoDB (base: ${mongoose.connection.name})`);
}
