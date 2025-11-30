const express = require("express");
const app = express();
app.use(express.json());

// Estado de cada "campo"
let canales = {
  TempAmb: "0",
  HumAmb: "0",
  HumSuelo: "0",
  Battery: "0"
};

// Leer el valor de un canal
app.get("/canal/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  if (canales[nombre] !== undefined) {
    res.send(canales[nombre].toString());
  } else {
    res.status(404).send("Canal no existe");
  }
});

// Escribir un valor en un canal
app.post("/canal/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const valor = req.body.valor;
  if (canales[nombre] !== undefined) {
    canales[nombre] = valor.toString();
    res.send("OK");
  } else {
    res.status(400).send("Canal no existe");
  }
});

// Actualizar varios campos
app.post("/canales", (req, res) => {
  const data = req.body; // JSON con varios campos
  for (const key in data) {
    if (canales[key] !== undefined) {
      canales[key] = data[key].toString();;
    }
  }
  res.send("OK");
});

// Leer varios canales a la vez
app.get("/canales", (req, res) => {
  res.json({
    TempAmb: canales.TempAmb.toString(),
    HumAmb: canales.HumAmb.toString(),
    HumSuelo: canales.HumSuelo.toString(),
    Battery: canales.Battery.toString()
  });
});

// ================= HTTP y HTTPS =================
// Para que tu A7670G pueda conectarse via HTTP plano
const http = require("http");
http.createServer(app).listen(3000, () => console.log("Servidor HTTP activo en puerto 3000"));