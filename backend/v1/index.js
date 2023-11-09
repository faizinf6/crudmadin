import express from 'express';
import bodyParser from 'body-parser';
import muridRoutes from './routes/muridRoutes.js';
import kelasRoutes from './routes/kelasRoutes.js';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/murid', muridRoutes);
app.use('/kelas', kelasRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
