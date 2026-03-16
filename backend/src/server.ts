import app from "./app.js";

// 1. Primero definís todas tus rutas
app.get('/', (req, res) => {
  res.send('El backend está vivo, Lucas!');
});

// 2. Después arrancás el servidor
const PORT = Number(process.env.PORT) || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});