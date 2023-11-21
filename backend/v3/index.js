import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import muridRoutes from './routes/muridRoutes.js';
import kelasRoutes from './routes/kelasRoutes.js';
import nilaiRoutes from './routes/nilaiMapelRoutes.js';
import fanRoutes from './routes/cabangIlmuRoutes.js';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use('/murid', muridRoutes);
app.use('/kelas', kelasRoutes);
app.use('/nilai', nilaiRoutes);
app.use('/fan', fanRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
