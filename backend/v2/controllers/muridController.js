import { Murid,Mapel,Kelas } from '../models/index.js'; // Sesuaikan dengan lokasi file model Anda

export class MuridController {
    // Create
    static async createMurid(req, res) {
        try {
            const { id_murid, nama_murid, id_kelas, isBoyong } = req.body;
            const murid = await Murid.create({ id_murid, nama_murid, id_kelas, isBoyong });
            res.status(201).json(murid);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Read
    static async getAllMurid(req, res) {
        try {
            const murids = await Murid.findAll();
            res.status(200).json(murids);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getMuridById(req, res) {
        try {
            const { id } = req.params;
            const murid = await Murid.findByPk(id);
            if (murid) {
                res.status(200).json(murid);
            } else {
                res.status(404).json({ message: 'Murid not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update
    static async updateMurid(req, res) {
        try {
            const { id } = req.params;
            const { nama_murid, id_kelas, isBoyong } = req.body;
            const updated = await Murid.update({ nama_murid, id_kelas, isBoyong }, {
                where: { id_murid: id }
            });

            if (updated) {
                const updatedMurid = await Murid.findByPk(id);
                res.status(200).json(updatedMurid);
            } else {
                res.status(404).json({ message: 'Murid not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete
    static async deleteMurid(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Murid.destroy({
                where: { id_murid: id }
            });

            if (deleted) {
                res.status(200).json({ message: 'Murid deleted' });
            } else {
                res.status(404).json({ message: 'Murid not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createManyMurid(req, res) {
        try {
            const murids = req.body; // Ini adalah array murid

            // Memastikan bahwa request adalah array
            if (!Array.isArray(murids)) {
                return res.status(400).json({ message: 'Input harus berupa array' });
            }

            // Menambahkan semua murid ke dalam database
            const createdMurids = await Murid.bulkCreate(murids, { validate: true });

            res.status(201).json(createdMurids);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    
  static async getAllMapelSpecificMurid(req, res) {
    try {
        const { id_murid } = req.params;

        const murid = await Murid.findByPk(id_murid, {
            attributes: [
                'id_kelas',
                `nama_murid`
            ]
        });
  

        // Dapatkan id_angkatan yang berkaitan dengan id_kelas
        const kelas = await Kelas.findByPk(murid.id_kelas, {
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
            attributes: ['nama_mapel']
        });
        // const namaKelas = await Kelas.findAll({
        //     where: { id_kelas: kelas.id_angkatan },
        //     attributes: ['nama_mapel']
        // });

        if (mapels && mapels.length > 0) {
            const namaMapels = mapels.map(m => m.nama_mapel);
            const namaKelas = kelas.nama_kelas;
            res.status(200).json(namaMapels );
        } else {
            res.status(404).json({ message: 'Tidak ada mata pelajaran ditemukan untuk kelas ini' });
        }
        // res.status(404).json({ message: `${id_murid}` });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}









}

export default MuridController;
