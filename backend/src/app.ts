// express es el framework para armar el server y las rutas
import express from "express";
// cors deja q el front (q corre en otro puerto) le pueda pegar al back, sino el navegador lo bloquea
import cors from "cors";

// aca se crea la app. este archivo solo la CONFIGURA, no la arranca (eso esta en index.ts)
// lo separo asi para q despues los tests con supertest puedan usar la app sin levantar el server
export const app = express();

// middlewares: funciones q se ejecutan en cada pedido antes de llegar a la ruta
app.use(cors());
// express.json() lee el body en JSON y lo deja en req.body, sin esto req.body llega vacio
app.use(express.json());

// ruta de prueba para ver si el server esta vivo
// el _ en _req es xq no lo uso, es para q no se queje TS
// status 200 = todo ok
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
