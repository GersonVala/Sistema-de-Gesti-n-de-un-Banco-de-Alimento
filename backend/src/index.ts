// punto de entrada, es lo q corre npm run dev
// env va primero para q se cargue el .env antes q todo lo demas
// los imports llevan .js aunque el archivo sea .ts, es la regla de ES Modules en node (apunta al archivo ya convertido a js)
import { env } from "./config/env.js";
import { app } from "./app.js";

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
