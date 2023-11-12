import express from 'express';
import bodyParser from 'body-parser';
import muridRoutes from './routes/muridRoutes.js';
import kelasRoutes from './routes/kelasRoutes.js';
import nilaiRoutes from './routes/mapelRoutes.js';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.use('/murid', muridRoutes);
app.use('/kelas', kelasRoutes);
app.use('/nilai', kelasRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
