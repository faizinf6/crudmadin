import { Mapel } from '../models/index.js';// Ganti dengan lokasi file model Anda

export class MapelController {
    // Create
    static async createMapel(req, res) {
        try {
            const { id_mapel, nama_mapel, id_angkatan } = req.body;
            const mapel = await Mapel.create({ id_mapel, nama_mapel, id_angkatan });
            res.status(201).json(mapel);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Read
    static async getAllMapel(req, res) {
        try {
            const mapels = await Mapel.findAll();
            res.status(200).json(mapels);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getMapelById(req, res) {
        try {
            const { id } = req.params;
            const mapel = await Mapel.findByPk(id);
            if (mapel) {
                res.status(200).json(mapel);
            } else {
                res.status(404).json({ message: 'Mapel not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update
    static async updateMapel(req, res) {
        try {
            const { id } = req.params;
            const { nama_mapel, id_angkatan } = req.body;
            const updated = await Mapel.update({ nama_mapel, id_angkatan }, {
                where: { id_mapel: id }
            });

            if (updated) {
                const updatedMapel = await Mapel.findByPk(id);
                res.status(200).json(updatedMapel);
            } else {
                res.status(404).json({ message: 'Mapel not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete
    static async deleteMapel(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Mapel.destroy({
                where: { id_mapel: id }
            });

            if (deleted) {
                res.status(200).json({ message: 'Mapel deleted' });
            } else {
                res.status(404).json({ message: 'Mapel not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createManyMapel(req, res) {
        try {
            const mapels = req.body; // Ini adalah array murid

            // Memastikan bahwa request adalah array
            if (!Array.isArray(mapels)) {
                return res.status(400).json({ message: 'Input harus berupa array' });
            }

            // Menambahkan semua murid ke dalam database
            const createdMapels = await Mapel.bulkCreate(mapels, { validate: true });

            res.status(201).json(createdMapels);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default MapelController;
