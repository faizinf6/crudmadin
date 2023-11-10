// MuridController.js
import { Murid,Kelas } from '../models/index.js';

export const createMurid = async (req, res) => {
  try {
    const { Nama, gender, isBoyong, kelasId } = req.body;
    const murid = await Murid.create({ Nama, gender, isBoyong, kelasId });
    res.status(201).json(murid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllMurids = async (req, res) => {
  try {
    const kelas = await Murid.findAll();
    res.status(200).json(kelas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMuridById= async (req, res) => {
  try {
    const murid = await Murid.findByPk(req.params.id);
    if (murid) {
      res.status(200).send(murid);
    } else {
      res.status(404).send({ message: 'Murid not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};



export const updateMurid = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nama, gender, isBoyong, KelasId } = req.body;
    const murid = await Murid.findByPk(id);
    if(murid) {
      murid.Nama = Nama;
      murid.gender = gender;
      murid.isBoyong = isBoyong;
      murid.KelasId = KelasId;
      await murid.save();
      res.status(200).json(murid);
    } else {
      res.status(404).json({ error: 'Murid not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMurid = async (req, res) => {
  try {
    const { id } = req.params;
    const murid = await Murid.findByPk(id);
    if(murid) {
      await murid.destroy();
      res.status(200).json({ message: 'Murid deleted' });
    } else {
      res.status(404).json({ error: 'Murid not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMuridInSpecificKelas = async (req, res) => {
  try {
    const { waktu_kelas, jenis_kelas, jenjang_kelas, pembagian_kelas } = req.query;
    const kelas = await Kelas.findOne({
      where: { waktu_kelas, jenis_kelas, jenjang_kelas, pembagian_kelas }
    });

    if(kelas) {
      const murids = await Murid.findAll({
        where: { KelasId: kelas.id },
        include:[{
          model: Kelas,
          as: 'kelas'
        }]
      });
      res.status(200).json(murids);
    } else {
      res.status(404).json({ error: 'Kelas not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  getAllMurids,
  getMuridById,
  createMurid,
  updateMurid,
  deleteMurid,
  getMuridInSpecificKelas
};

