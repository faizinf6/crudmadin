import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import muridRoutes from './routes/muridRoutes.js';
import kelasRoutes from './routes/kelasRoutes.js';
import nilaiRoutes from './routes/nilaiMapelRoutes.js';
import fanRoutes from './routes/cabangIlmuRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
const app = express();
const PORT = process.env.PORT || 5000;
import session from 'express-session'
import AdminController from "./controllers/AdminController.js";


app.use(cors());
app.use(bodyParser.json());
app.use('/murid', muridRoutes);
app.use('/kelas', kelasRoutes);
app.use('/nilai', nilaiRoutes);
app.use('/fan', fanRoutes);
app.use('/admin', adminRoutes);

app.use(session({
  secret: 'rahasia', // Ganti dengan secret key Anda
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Untuk HTTPS gunakan `true`
}));
app.post('/auth', AdminController.getWesLoginUrung);
app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        // handle error
        res.status(500).send('Error');
      } else {
        res.send({ status: 'Logged out' });
      }
    });
  } else {
    res.status(404).send('Session not found');
  }
});

// Data contoh murid
// ini unutk arduino ..hapus tiddak masalah
const students = [
  { nama_murid: 'Andi', id_murid: "4269501635" },
  { nama_murid: 'Budi', id_murid: "4269216147" },
  { nama_murid: 'Citra', id_murid: "0274879331" },
  { nama_murid: 'Dukun', id_murid: "0227251715" }
];

// Route untuk mendapatkan murid berdasarkan ID
app.get('/santri/:id', (req, res) => {
  const id = (req.params.id);
  const student = students.find(s => s.id_murid === id);

  console.log( ({ nama_murid: student.nama_murid, waktu_respon: new Date().toLocaleString() }))
  if (student) {
    res.json({ nama_murid: student.nama_murid, waktu_respon: new Date().toLocaleString() });
  } else {
    res.status(404).send('Murid tidak ditemukan');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

