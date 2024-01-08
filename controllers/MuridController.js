import {CabangIlmu, Kelas, Mapel, Murid, NilaiHafalan, NilaiMapel} from '../models/models.js'; // Sesuaikan dengan lokasi file model Anda

export class MuridController {
    // Create
    static async createOneMurid(req, res) {
        try {
            const {id_murid, nama_murid, id_kelas, isBoyong} = req.body;
            const murid = await Murid.create({id_murid, nama_murid, id_kelas, isBoyong});
            const dataKelas = await Kelas.findOne({where:{id_kelas:id_kelas}})
            const daftarMapel = await Mapel.findAll({
                where: { id_angkatan: dataKelas.id_angkatan }
            });

            const nilaiMapeluntukSingleMurid = daftarMapel.map(async (mapel)=>{
                await NilaiMapel.findOrCreate({
                    where: {id_murid: id_murid, id_mapel: mapel.id_mapel},
                    defaults: {
                        status_taftisan: false,
                        isi_nilai: 0,
                        id_fan: mapel.id_fan
                    }
                })

            })

            await NilaiHafalan.findOrCreate({
                where:{id_murid:id_murid},
                defaults:{
                    pencapaian:0,
                    kelancaran:0,
                    artikulasi:0
                }
            })

            res.status(201).json(nilaiMapeluntukSingleMurid);

        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async createManyMurid(req, res) {
        try {
            const muridArray = req.body; // Array of murid objects

            for (const muridData of muridArray) {
                const { id_murid, nama_murid, id_kelas, isBoyong } = muridData;
                await Murid.create({ id_murid, nama_murid, id_kelas, isBoyong });
                const dataKelas = await Kelas.findOne({ where: { id_kelas: id_kelas } });
                const daftarMapel = await Mapel.findAll({
                    where: { id_angkatan: dataKelas.id_angkatan }
                });

                const nilaiMapelPromises = daftarMapel.map(mapel => {
                    return NilaiMapel.findOrCreate({
                        where: { id_murid: id_murid, id_mapel: mapel.id_mapel },
                        defaults: {
                            status_taftisan: false,
                            isi_nilai: 0,
                            id_fan: mapel.id_fan
                        }
                    });
                });

                // Wait for all NilaiMapel operations to complete
                await Promise.all(nilaiMapelPromises);

                await NilaiHafalan.findOrCreate({
                    where: { id_murid: id_murid },
                    defaults: {
                        pencapaian: 0,
                        kelancaran: 0,
                        artikulasi: 0
                    }
                });
            }

            // Respond with the total number of murids created
            res.status(201).json(`${muridArray.length} Murid telah berhasil dibuat`);

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
            res.status(500).json({error: error.message});
        }
    }


    static async paginationAllMuridBoyong(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;

        try {
            const muridData = await Murid.findAndCountAll({
                where: { isBoyong: true },
                limit: pageSize,
                offset: offset
            });

            const totalPages = Math.ceil(muridData.count / pageSize);

            // Fetch nama_kelas for each Murid
            for (const murid of muridData.rows) {
                const kelas = await Kelas.findByPk(murid.id_kelas);
                murid.dataValues.nama_kelas = kelas ? kelas.nama_kelas : 'Kelas not found'; // menambahkan nama kelas !!!!!@!
            }

            res.json({
                data: muridData.rows,
                currentPage: page,
                totalPages: totalPages
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }




    static async getMuridById(req, res) {
        try {
            const {id} = req.params;
            const murid = await Murid.findByPk(id);
            if (murid) {
                res.status(200).json(murid);
            } else {
                res.status(404).json({message: 'Murid not found'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    static async getLastIdMurid(req, res) {
        //menemukan Murid siapa yagn paling baru ditambahkan
        try {
            const lastMurid = await Murid.findAll({
                limit:1,
                order: [['id_murid', 'DESC']] // Urutkan berdasarkan id, descending
            });
            if (lastMurid) {
                res.status(200).json(lastMurid[0].id_murid);
            } else {
                res.status(404).json({message: 'Babi not found'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    // Update
    static async updateMurid(req, res) {
        try {
            const {id} = req.params;
            const {nama_murid, id_kelas, isBoyong} = req.body;
            const updated = await Murid.update({nama_murid, id_kelas, isBoyong}, {
                where: {id_murid: id}
            });

            if (updated) {
                const updatedMurid = await Murid.findByPk(id);
                res.status(200).json(updatedMurid);
            } else {
                res.status(404).json({message: 'Murid not found'});
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    // Delete
    static async deleteMurid(req, res) {
        try {
            const {id} = req.params;
            const deleted = await Murid.destroy({
                where: {id_murid: id}
            });

            if (deleted) {
                res.status(200).json({message: 'Murid deleted'});
            } else {
                res.status(404).json({message: 'Murid not found'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }



    static async getAllMapelSpecificMurid(req, res) {
        try {
            const {id_murid} = req.params;

            const hasilAkhir = await  MuridController.cariNilaiRapotMurid(id_murid);


            res.status(200).json(hasilAkhir);


        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async getNilaiForAllMurids(murids) {
        try {

            return await Promise.all(murids.map(async arek => {

                    try {
                        const nilaiMurid = await NilaiMapel.findAll({
                            where: {id_murid: arek.id_murid},
                            include: [{model: Mapel, include: [{model: CabangIlmu}]}]
                        });

                        const murid = await Murid.findByPk(arek.id_murid, {
                            attributes: ['id_kelas', 'nama_murid', 'id_murid']
                        });

                        const kelas = await Kelas.findByPk(murid.id_kelas, {
                            attributes: ['id_angkatan', 'nama_kelas']
                        });

                        const arrayNilai = nilaiMurid.map(bocah => ({
                            id_murid: murid.id_murid,
                            nama_murid: murid.nama_murid,
                            kelas: kelas.nama_kelas,
                            mapel: bocah.Mapel.nama_mapel,
                            isi_nilai: bocah.isi_nilai,
                            id_fan: bocah.id_fan,
                            fan: bocah.Mapel.CabangIlmu.nama_fan
                        }));

                        const hasil = arrayNilai.reduce((acc, item) => {
                            if (acc[item.id_fan]) {
                                acc[item.id_fan].isi_nilai += item.isi_nilai;
                                acc[item.id_fan].count += 1;
                                if (!acc[item.id_fan].mapel.includes(item.mapel)) {
                                    acc[item.id_fan].mapel += ", " + item.mapel;
                                }
                            } else {
                                acc[item.id_fan] = {...item, count: 1};
                            }
                            return acc;
                        }, {});

                        for (const key in hasil) {
                            hasil[key].isi_nilai = hasil[key].isi_nilai / hasil[key].count;
                        }
                        // console.log(Object.values(hasil)[0])

                        return Object.values(hasil);
                    } catch (error) {
                        console.error("Error in getNilaiMapelByIdMurid: ", error);
                        throw error;
                    }

                    // return MuridController.cariNilaiRapotMurid(arek.id_murid)

                }
            ));
        } catch (error) {
            console.error("Error in getNilaiForAllMurids: ", error);
            throw error;
        }
    };

    static async getNilaiRapotMuridPerkelas(req, res) {
        try {
            const {id_kelas} = req.params;
            const listKelas = await Kelas.findAll({
                where: { id_kelas: id_kelas },
                include: [{
                    model: Murid,
                    where: { isBoyong: false }, // Add this line to filter Murid records
                    required: false // Optional based on your requirements
                }]
            });

            const listbabi = listKelas.map(kelas => {
                return kelas.Murids.map(murid => {
                    return {
                        id_murid: murid.id_murid,
                        nama: murid.nama_murid,

                    }
                })
            })

            const cece = await MuridController.getNilaiForAllMurids(listbabi[0])
            res.status(200).json(cece);

        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


}

export default MuridController;
