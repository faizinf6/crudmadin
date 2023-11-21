import { CabangIlmu }  from '../models/models.js';// Sesuaikan dengan lokasi file model Anda

export class CabangIlmuController {
  
    static async createCabangIlmu(req, res) {
        try {
            const cabangIlmu = await CabangIlmu.create(req.body);
            res.status(201).send(cabangIlmu);
          } catch (error) {
            res.status(400).send(error);
          }
    }
    static async getAllCabangIlmu(req, res) {
        try {
            const cabangIlmu = await CabangIlmu.findAll();
            res.status(200).send(cabangIlmu);
          } catch (error) {
            res.status(400).send(error);
          }
    }
    static async updateCabangIlmu(req, res) {
        try {
            const update = await CabangIlmu.update(req.body, {
              where: { id_fan: req.params.idFan }
            });
            if (update[0]) {
              res.status(200).send("Cabang Ilmu diupdate.");
            } else {
              throw new Error('Cabang Ilmu tidak ditemukan.');
            }
          } catch (error) {
            res.status(400).send(error);
          }
    }
    static async deleteCabangIlmu(req, res) {
        try {
            const jumlahHapus = await CabangIlmu.destroy({
              where: { id_fan: req.params.idFan }
            });
            if (jumlahHapus) {
              res.status(200).send("Cabang Ilmu dihapus.");
            } else {
              throw new Error('Cabang Ilmu tidak ditemukan.');
            }
          } catch (error) {
            res.status(400).send(error);
          }
    }
    static async addCabangIlmuBatch(req, res) {
      try {
        // req.body diharapkan berisi array dari objek CabangIlmu
        const cabangIlmuArray = req.body; 
    
        if (!Array.isArray(cabangIlmuArray) || cabangIlmuArray.length === 0) {
          return res.status(400).send("Input harus berupa array dari CabangIlmu.");
        }
    
        const result = await CabangIlmu.bulkCreate(cabangIlmuArray);
        res.status(201).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    }
    // static async CabangIlmu(req, res) {

    // }


}

export default CabangIlmuController;
