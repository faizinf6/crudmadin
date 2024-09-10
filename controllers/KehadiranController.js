import {Angkatan, Kehadiran, Murid} from '../models/models.js';// Sesuaikan dengan lokasi file model Anda

export class KehadiranController {
    // Create
    static async createKehadiran(req, res) {
        try {
            const kehadiran = await Kehadiran.create(req.body);
            res.status(201).send(kehadiran);
          } catch (error) {
            res.status(400).send(error);
          }
    }

    static async getAllKehadiran(req, res) {

    }
    static async getAllKehadiranByIdMurid(req, res) {
        try {
            const idMurid = req.params.idMurid; // mendapatkan ID Murid dari parameter URL
            const kehadiran = await Kehadiran.findAll({
              where: { id_murid: idMurid }
            });
        
            if (kehadiran && kehadiran.length > 0) {
              res.status(200).send(kehadiran);
            } else {
              res.status(404).send('Kehadiran untuk murid dengan ID tersebut tidak ditemukan.');
            }
          } catch (error) {
            res.status(500).send(error.message || 'Terjadi kesalahan saat mengambil data kehadiran.');
          }
    }
    static async updateKehadiran(req, res) {
        try {
            const update = await Kehadiran.update(req.body, {
              where: { id_murid: req.params.id_murid }
            });
            if (update[0]) {
                const updatedAngkatan = await Kehadiran.findOne({where:{id_murid:req.params.id_murid}})

              res.status(200).send(updatedAngkatan);
            } else {
              throw new Error('Kehadiran tidak ditemukan.');
            }
          } catch (error) {
            res.status(400).send(error);
          }
    }
    static async deleteKehadiran(req, res) {
        try {
            const jumlahHapus = await Kehadiran.destroy({
              where: { id: req.params.id }
            });
            if (jumlahHapus) {
              res.status(200).send("Kehadiran dihapus.");
            } else {
              throw new Error('Kehadiran tidak ditemukan.');
            }
          } catch (error) {
            res.status(400).send(error);
          }
    }
    static async findOrCreateKehadiran(req, res) {
      try {
        const idMurid = req.params.id_murid;
        let kehadiran = await Kehadiran.findOne({ where: { id_murid: idMurid } });
    
        if (!kehadiran) {
          kehadiran = await Kehadiran.create({ id_murid: idMurid, alpha: 0, izin: 0, sakit: 0 });
        }
    
        res.status(200).send(kehadiran);
      } catch (error) {
        res.status(500).send(error.message || 'Terjadi kesalahan saat mencari atau membuat kehadiran.');
      }
    }

    static async getPelanggaran(req, res) {
      try {
        const idMurid = req.params.id_murid;
        let kehadiran = await Kehadiran.findOne({ where: { id_murid: idMurid } });

        if (!kehadiran) {
          kehadiran = await Kehadiran.create({ id_murid: idMurid, alpha: 0, izin: 0, sakit: 0 });
        }
        kehadiran.alpha = parseFloat(kehadiran.alpha)/15

        res.status(200).send(kehadiran);
      } catch (error) {
        res.status(500).send(error.message || 'Terjadi kesalahan saat mencari atau membuat kehadiran.');
      }
    }
    static async findOrCreateKehadiranByIdKelas(req, res) {
      try {
        const id_kelas = req.params.id_kelas;
        const muridDiKelas = await Murid.findAll({ where: { id_kelas: id_kelas,isBoyong: false  } });
    
        if (!muridDiKelas || muridDiKelas.length === 0) {
          return res.status(404).send('Tidak ada murid yang ditemukan untuk kelas ini.');
        }
    
        let kehadiranMurid = [];

        for (const murid of muridDiKelas) {
          const [kehadiran] = await Kehadiran.findOrCreate({
            where: { id_murid: murid.id_murid },
            defaults: { alpha: 0, izin: 0, sakit: 0 }
          });
            console.log("tes")
          kehadiranMurid.push({ 
            id_murid: murid.id_murid, 
            nama_murid: murid.nama_murid,
            kehadiran: kehadiran.get({ plain: true }) 
          });
        }
    
        res.status(200).json(kehadiranMurid);
      } catch (error) {
        res.status(500).send(error.message || 'Terjadi kesalahan saat mencari atau membuat kehadiran.');
      }
    }


}

export default KehadiranController;
