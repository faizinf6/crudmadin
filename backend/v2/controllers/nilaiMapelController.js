import { NilaiMurid,Murid,Mapel,Kelas, Angkatan } from '../models/index.js';


export class NilaiMuridController {
    // Fungsi untuk menambah nilai baru
    static async addNilai(req, res) {
        try {
            const { id_murid, id_mapel, nilai } = req.body;

            // Cari id_kelas dari entitas Murid
            const murid = await Murid.findByPk(id_murid);
            if (!murid) {
                return res.status(404).json({ message: 'Murid tidak ditemukan' });
            }

            // Dapatkan id_kelas dari entitas Murid
            const id_kelas = murid.id_kelas;

            // Tambahkan record nilai baru
            const nilaiMurid = await NilaiMurid.create({
                id_murid,
                id_kelas, // Diambil dari Murid
                id_mapel,
                nilai
            });

            res.status(201).json(nilaiMurid);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

        // Fungsi untuk menambahkan banyak nilai sekaligus
        static async addManyNilai(req, res) {
            try {
                const nilaiArray = req.body; // Ini adalah array nilai
    
                // Memastikan bahwa request adalah array
                if (!Array.isArray(nilaiArray)) {
                    return res.status(400).json({ message: 'Input harus berupa array' });
                }
    
                // Mencari id_kelas untuk setiap murid dan menyiapkan data untuk bulk create
                const preparedData = await Promise.all(nilaiArray.map(async item => {
                    const murid = await Murid.findByPk(item.id_murid);
                    if (!murid) {
                        throw new Error(`Murid dengan ID ${item.id_murid} tidak ditemukan`);
                    }
                    return {
                        ...item,
                        id_kelas: murid.id_kelas // Menambahkan id_kelas dari Murid
                    };
                }));
    
                // Melakukan bulk create
                const createdNilai = await NilaiMurid.bulkCreate(preparedData, { validate: true });
    
                res.status(201).json(createdNilai);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }

    // Fungsi untuk mengambil semua nilai seorang murid di kelas tertentu
    static async getMapelDanNilaiMurid(req, res) {
        try {
            const { id_murid } = req.query;
            const murid = await Murid.findByPk(id_murid);
            if (!murid) {
                return res.status(404).json({ message: 'Murid tidak ditemukan' });
            }
            // Mendapatkan daftar mata pelajaran dan nilai
            const nilaiMurid = await NilaiMurid.findAll({
                where: { id_murid: id_murid },
                include: [
                    { model: Mapel, attributes: ['id_mapel','nama_mapel'] },
                    { model: Kelas, attributes: ['id_kelas','nama_kelas'] }
                ]
            });

            const result = nilaiMurid.map(record => {
                return {
                    id_murid: murid.id_murid, 
                    nama_murid: murid.nama_murid, 
                    id_kelas: record.Kela.id_kelas, //Kelas menjadi "Kela" karena babi sequelize tetep menghapus S di model name ...sayaa tidak tau pushing bang!
                    nama_kelas: record.Kela.nama_kelas, //Kelas menjadi "Kela" karena babi sequelize tetep menghapus S di model name ...sayaa tidak tau pushing bang!
                    id_mapel: record.Mapel.id_mapel,
                    nama_mapel: record.Mapel.nama_mapel,
                    nilai: record.nilai
                };
            });

            res.status(200).json(result);

            // res.status(200).json(nilaiMurid);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllNilai(req, res) {
        try {
            const kelasList = await NilaiMurid.findAll(
                { include: [{
                    model: Mapel,
                    as: 'Mapel'
                  },{
                    model: Murid,
                    as: 'Murid'
                  }]}
            );
            res.status(200).json(kelasList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    
    static async getAllNilaiBySpecificIdMapel(req, res) {
        try {
            const { id_kelas, id_mapel } = req.query;

            const nilaiMapelList = await NilaiMurid.findAll({
                where: { id_mapel: id_mapel },
                include: [{
                    model: Murid,
                    as: 'Murid',
                    required: false,
                    where: { id_kelas: id_kelas }
                }, { model: Kelas, attributes: ['id_kelas','nama_kelas'] },{ model: Mapel, attributes: ['id_mapel','nama_mapel'] },]
            });

            const result = nilaiMapelList.map(record => {
                return {
                    id_murid: record.id_murid, 
                    nama_murid: record.Murid.nama_murid, 
                    id_kelas: record.Kela.id_kelas, //Kelas menjadi "Kela" karena babi sequelize tetep menghapus S di model name ...sayaa tidak tau pushing bang!
                    nama_kelas: record.Kela.nama_kelas, //Kelas menjadi "Kela" karena babi sequelize tetep menghapus S di model name ...sayaa tidak tau pushing bang!
                    id_mapel: record.Mapel.id_mapel,
                    nama_mapel: record.Mapel.nama_mapel,
                    nilai: record.nilai
                };
            });

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async getAllNilaiBySpecificIdKelas(req, res) {
        try {
            const { id_kelas } = req.query;

            const nilaiMapelList = await NilaiMurid.findAll({
                where: { id_kelas: id_kelas },
                include: [{
                    model: Murid,
                    as: 'Murid',
                    required: false,
                }]
            });

            res.status(200).json(nilaiMapelList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async addNilaiMapelByIdKelas(req, res) {
        try {
            const { id_kelas, id_mapel } = req.params;
    
            // Cari murid-murid yang sesuai dengan id_kelas
            const muridList = await Murid.findAll({
                where: { id_kelas: id_kelas }
            });
    
            if (muridList.length === 0) {
                return res.status(404).json({ message: 'Tidak ada murid di kelas ini' });
            }
    
            const filteredMuridList = [];
            for (const murid of muridList) {
                const existingNilai = await NilaiMurid.findOne({
                    where: {
                        id_murid: murid.id_murid,
                        id_kelas,
                        id_mapel
                    }
                });
    
                if (!existingNilai) {
                    filteredMuridList.push({
                        id_murid: murid.id_murid,
                        id_kelas,
                        id_mapel,
                        nilai: 0 // Nilai default
                    });
                }
            }
    
            // Bulk create nilai untuk murid yang belum memiliki nilai
            const createdNilai = await NilaiMurid.bulkCreate(filteredMuridList, { validate: true });
    
            res.status(201).json(createdNilai)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateNilaiMurid(req, res) {
        try {
            const { id,id_kelas, id_mapel, nilai } = req.query;
            const updated = await NilaiMurid.update({ id_kelas, id_mapel,nilai }, {
                where: { id_murid: id,id_kelas: id_kelas,id_mapel:id_mapel},
            });

            if (updated) {
                const updatedMurid = await NilaiMurid.findOne(
                    {where: { id_murid:id,id_mapel:id_mapel }}

                    );
                res.status(200).json(updatedMurid);
            } else {
                res.status(404).json({ message: 'Murid not found' });
            }
            // res.status(404).json({ message: `${id}` });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


   
}

export default NilaiMuridController;
