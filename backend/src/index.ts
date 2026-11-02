// punto de entrada, es lo q corre npm run dev
// env va primero para q se cargue el .env antes q todo lo demas
// los imports llevan .js aunque el archivo sea .ts, es la regla de ES Modules en node (apunta al archivo ya convertido a js)
import { env } from "./config/env.js";
import { conectarDB } from "./config/db.js";
import { app } from "./app.js";

// primero conecto a la base y DESPUES levanto el server
// si el server arrancara sin base, el primer pedido q use mongo fallaria
async function iniciar(): Promise<void> {
  try {
    await conectarDB();
  } catch (error) {
    // el error del catch es "unknown" en TS, por eso chequeo q sea un Error antes de leer .message
    const mensaje = error instanceof Error ? error.message : String(error);
    console.error("No se pudo conectar a MongoDB:", mensaje);
    process.exit(1);
  }

  // arranca el server en el puerto del .env
  // en express 5 si falla (ej el puerto ya esta ocupado) el error llega aca
  app.listen(env.PORT, (error) => {
    if (error) {
      console.error("No se pudo levantar el servidor:", error.message);
      process.exit(1);
    }
    // despues esto lo cambio por el logger (paso 4)
    console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
  });
}

iniciar();
