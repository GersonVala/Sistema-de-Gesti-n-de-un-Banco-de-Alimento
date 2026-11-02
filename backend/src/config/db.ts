import { setServers } from "node:dns";
import mongoose from "mongoose";
import { env } from "./env.js";

// conecta mongoose con mongo atlas usando la uri del .env
// es async xq conectarse por internet tarda y hay q esperar a q termine (await)
// si falla tira error y lo agarra index.ts
export async function conectarDB(): Promise<void> {
  // la uri es mongodb+srv://, eso primero hace una consulta DNS (SRV) para saber los servidores del cluster
  // en windows node a veces no lee bien el DNS del sistema y le pregunta a 127.0.0.1 -> "querySrv ECONNREFUSED"
  // por eso le digo a node q use DNS publicos (cloudflare y google). solo cambia las consultas de node, no las de windows
  setServers(["1.1.1.1", "8.8.8.8"]);

  await mongoose.connect(env.MONGO_URI);
  // muestro el nombre de la base para chequear q no quedo en "test" (pasa si no pusiste /banco-alimentos en la uri)
  console.log(`Conectado a MongoDB (base: ${mongoose.connection.name})`);
}
