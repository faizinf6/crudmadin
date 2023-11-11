import { Angkatan }  from '../models/index.js';// Sesuaikan dengan lokasi file model Anda

export class AngkatanController {
    // Create
    static async createAngkatan(req, res) {
        try {
            const { id_angkatan, nama_angkatan } = req.body;
            const angkatan = await Angkatan.create({ id_angkatan, nama_angkatan });
            res.status(201).json(angkatan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Read
    static async getAllAngkatan(req, res) {
        try {
            const angkatans = await Angkatan.findAll();
            res.status(200).json(angkatans);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAngkatanById(req, res) {
        try {
            const { id } = req.params;
            const angkatan = await Angkatan.findByPk(id);
            if (angkatan) {
                res.status(200).json(angkatan);
            } else {
                res.status(404).json({ message: 'Angkatan not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update
    static async updateAngkatan(req, res) {
        try {
            const { id } = req.params;
            const { nama_angkatan } = req.body;
            const updated = await Angkatan.update({ nama_angkatan }, {
                where: { id_angkatan: id }
            });

            if (updated) {
                const updatedAngkatan = await Angkatan.findByPk(id);
                res.status(200).json(updatedAngkatan);
            } else {
                res.status(404).json({ message: 'Angkatan not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete
    static async deleteAngkatan(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Angkatan.destroy({
                where: { id_angkatan: id }
            });

            if (deleted) {
                res.status(200).json({ message: 'Angkatan deleted' });
            } else {
                res.status(404).json({ message: 'Angkatan not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createManyAngkatan(req, res) {
        try {
            const angkatans = req.body; // Ini adalah array murid

            // Memastikan bahwa request adalah array
            if (!Array.isArray(angkatans)) {
                return res.status(400).json({ message: 'Input harus berupa array' });
            }

            // Menambahkan semua murid ke dalam database
            const created_angkatans = await Angkatan.bulkCreate(angkatans, { validate: true });

            res.status(201).json(created_angkatans);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }









}

export default AngkatanController;
