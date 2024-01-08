import {JSON, Model} from 'sequelize';
import { Angkatan, Kelas,Mapel,Murid } from '../models/models.js'; // Ganti dengan lokasi file model Anda

export class KelasController {
    // Create
    static async createKelas(req, res) {
        try {
            const { id_kelas, nama_kelas, id_angkatan } = req.body;
            const kelas = await Kelas.create({ id_kelas, nama_kelas, id_angkatan });
            res.status(201).json(kelas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Read
    static async getAllKelas(req, res) {
        try {
            const kelasList = await Kelas.findAll(
                { include: [{
                    model: Murid,
                    as: 'Murids'
                  }]}
            );
            res.status(200).json(kelasList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getDataKelasTanpaMurid(req, res) {
        try {
            const kelasList = await Kelas.findAll(
            );
            const kelasDataDenganGender = kelasList.map(kelas => {
                // Konversi objek Sequelize ke JSON murni
                const kelasPlain = kelas.get({ plain: true });

                // Menentukan gender berdasarkan nama_kelas
                const namaKelasLower = kelasPlain.nama_kelas.toLowerCase();
                kelasPlain.gender = namaKelasLower.includes('pi') ? 'Pi' : 'Pa';

                return kelasPlain;
            });
            res.status(200).json((kelasDataDenganGender));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getKelasById(req, res) {
        try {
            const { id } = req.params;
            const kelas = await Kelas.findByPk(id);
            if (kelas) {
                res.status(200).json(kelas.Murids);
            } else {
                res.status(404).json({ message: 'Kelas not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update
    static async updateKelas(req, res) {
        try {
            const { id } = req.params;
            const { nama_kelas, id_angkatan } = req.body;
            const updated = await Kelas.update({ nama_kelas, id_angkatan }, {
                where: { id_kelas: id }
            });

            if (updated) {
                const updatedKelas = await Kelas.findByPk(id);
                res.status(200).json(updatedKelas);
            } else {
                res.status(404).json({ message: 'Kelas not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete
    static async deleteKelas(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Kelas.destroy({
                where: { id_kelas: id }
            });

            if (deleted) {
                res.status(200).json({ message: 'Kelas deleted' });
            } else {
                res.status(404).json({ message: 'Kelas not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createManyKelas(req, res) {
        try {
            const kelasArray = req.body; // Ini adalah array murid

            // Memastikan bahwa request adalah array
            if (!Array.isArray(kelasArray)) {
                return res.status(400).json({ message: 'Input harus berupa array' });
            }

            // Menambahkan semua murid ke dalam database
            const created_kelas = await Kelas.bulkCreate(kelasArray, { validate: true });

            res.status(201).json(created_kelas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async getAllNamaMurid(req, res) {
      try {
          const { id_kelas } = req.params;
          const kelas = await Kelas.findAll({
              where: { id_kelas: id_kelas }
              ,        include:[{
                model: Murid,
                as: 'Murids',where:{isBoyong:false}
              }] // Hanya mengambil atribut nama_murid
          });

        //   if (murids && murids.length > 0) {
        //       const namaMurids = murids.map(m => m.nama_murid);
        //       res.status(200).json(namaMurids);
        //   } else {
        //       res.status(404).json({ message: 'Tidak ada murid ditemukan di kelas ini' });
        //   }

        res.status(200).json(kelas)
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

  static async getAllMapelSpecificKelas(req, res) {
    try {
        const { id_kelas } = req.params;
        // Dapatkan id_angkatan yang berkaitan dengan id_kelas
        const kelas = await Kelas.findByPk(id_kelas, {
            attributes: [
                'id_angkatan',
                `nama_kelas`
            ]
        });

        if (!kelas) {
            return res.status(404).json({ message: 'Kelas not found' });
        }

        // Gunakan id_angkatan untuk mendapatkan mapel yang terkait
        const mapels = await Mapel.findAll({
            where: { id_angkatan: kelas.id_angkatan },
             include: [{
                model: Angkatan,
                as: 'Angkatan'
              }]
        });

        const mapelUtama = await Mapel.findAll({
            where: { id_angkatan: kelas.id_angkatan },

        });
        //ubah raw mysql ke json
        const jsonData = mapelUtama.map((mapel) => mapel.dataValues);
        let result = separateMapel(jsonData)

        console.log(result.mapelUtama)


            res.status(200).json(mapels );


        // const namaKelas = await Kelas.findAll({
        //     where: { id_kelas: kelas.id_angkatan },
        //     attributes: ['nama_mapel']
        // });

        // if (mapels && mapels.length > 0) {
        //     const namaMapels = mapels.map(m => m.nama_mapel);
        //     const namaKelas = kelas.nama_kelas;
        //     res.status(200).json(namaMapels );
        // } else {
        //     res.status(404).json({ message: 'Tidak ada mata pelajaran ditemukan untuk kelas ini' });
        // }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



}

export function separateMapel(jsonData) {
    let mapelUtama = [];
    let mapelOpsional = [];
    let idsMapelUtama = [];
    let foundRiyadloh = false;

    for (let item of jsonData) {
        if (item.nama_mapel === 'Riyadloh') {
            foundRiyadloh = true;
        }
        if (!foundRiyadloh) {
            mapelUtama.push(item);
            idsMapelUtama.push(item.id_mapel);
        } else {
            mapelOpsional.push(item);
        }
    }

    return { mapelUtama, mapelOpsional, idsMapelUtama };
}

export default KelasController;
