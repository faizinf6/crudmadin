// MuridController.js
import { Kelas,Murid } from '../models/index.js';

// Create Kelas
export const createKelas = async (req, res) => {
  try {
    const { waktu_kelas, jenis_kelas, jenjang_kelas, pembagian_kelas } = req.body;
    const newKelas = await Kelas.create({ waktu_kelas, jenis_kelas, jenjang_kelas, pembagian_kelas });
    res.status(201).json(newKelas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all Kelas
export const getAllKelas = async (req, res) => {
  try {
    const kelas = await Kelas.findAll({
      include: [{
        model: Murid,
        as: 'murid'
      }]
    });
    res.status(200).json(kelas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve a single Kelas by id
export const getKelasById = async (req, res) => {
  try {
    const { id } = req.params;
    const kelas = await Kelas.findByPk(id);
    if (kelas) {
      res.status(200).json(kelas);
    } else {
      res.status(404).json({ error: 'Kelas not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Kelas
export const updateKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const { waktu_kelas, jenis_kelas, jenjang_kelas, pembagian_kelas } = req.body;
    const kelas = await Kelas.findByPk(id);
    if (kelas) {
      kelas.waktu_kelas = waktu_kelas;
      kelas.jenis_kelas = jenis_kelas;
      kelas.jenjang_kelas = jenjang_kelas;
      kelas.pembagian_kelas = pembagian_kelas;
      await kelas.save();
      res.status(200).json(kelas);
    } else {
      res.status(404).json({ error: 'Kelas not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Kelas
export const deleteKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const kelas = await Kelas.findByPk(id);
    if (kelas) {
      await kelas.destroy();
      res.status(200).json({ message: 'Kelas deleted' });
    } else {
      res.status(404).json({ error: 'Kelas not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  createKelas,
  getAllKelas,
  getKelasById,
  updateKelas,
  deleteKelas
};

