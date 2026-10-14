// esto lee el archivo .env y mete todas las variables en process.env
// tiene q ir antes de usar cualquier variable, por eso esta arriba de todo
import "dotenv/config";

// lee una variable obligatoria, si no esta tira error y el server no arranca
// mejor q explote al iniciar y no a mitad de camino cuando alguien la usa
function requerida(nombre: string): string {
  const valor = process.env[nombre];
  if (!valor) {
    throw new Error(`Falta la variable de entorno ${nombre} en el .env`);
  }
  return valor;
}

// todo lo q viene del .env es string, el puerto lo paso a numero
// si no hay PORT uso 3000 (el ?? pone el valor por defecto solo si viene undefined)
const PORT = Number(process.env.PORT ?? 3000);
if (Number.isNaN(PORT)) {
  throw new Error("PORT tiene que ser un número");
}

// todas las variables juntas en un solo objeto
// en el resto del codigo uso env.PORT y no process.env.PORT directo, asi esta todo en un lugar
export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT,
  MONGO_URI: requerida("MONGO_URI"),
} as const;
