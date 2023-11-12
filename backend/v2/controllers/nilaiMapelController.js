import { NilaiMurid,Murid,Mapel,Kelas } from '../models/index.js';


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
            const { id_murid } = req.params;
            const murid = await Murid.findByPk(id_murid);
            if (!murid) {
                return res.status(404).json({ message: 'Murid tidak ditemukan' });
            }
            // Mendapatkan daftar mata pelajaran dan nilai
            const nilaiMurid = await NilaiMurid.findAll({
                where: { id_murid: id_murid },
                include: [
                    { model: Mapel, attributes: ['nama_mapel'] },
                    { model: Kelas, attributes: ['nama_kelas'] }
                ]
            });

            const result = nilaiMurid.map(record => {
                return {
                    nama_murid: murid.nama_murid, 
                    nama_kelas: record.Kela.nama_kelas, //Kelas menjadi "Kela" karena babi sequelize tetep menghapus S di model name ...sayaa tidak tau pushing bang!
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
    // ... tambahkan fungsi lain jika diperlukan
}

export default NilaiMuridController;
