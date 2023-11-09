// MuridController.js
import { Murid } from '../models/index.js';


  // Create a new Murid
  export const createMurid= async (req, res) => {
    try {
      const murid = await Murid.create(req.body);
      res.status(201).send(murid);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // Get a list of all Murids
  export const getAllMurids= async (req, res) => {
    try {
      const murids = await Murid.findAll();
      res.status(200).send(murids);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // Get a Murid by ID
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

  // Update a Murid by ID
  export const updateMurid= async (req, res) => {
    try {
      const updated = await Murid.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedMurid = await Murid.findByPk(req.params.id);
        res.status(200).send(updatedMurid);
      } else {
        res.status(404).send({ message: 'Murid not found' });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };
  // Delete a Murid by ID
  export const deleteMurid= async (req, res) => {
    try {
      const deleted = await Murid.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(200).send({ message: 'Murid deleted' });
      } else {
        res.status(404).send({ message: 'Murid not found' });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }


export default {
  getAllMurids,
  getMuridById,
  createMurid,
  updateMurid,
  deleteMurid
};

