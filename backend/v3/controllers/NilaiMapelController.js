import { NilaiMapel,Murid,Mapel,Kelas, Angkatan,CabangIlmu,NilaiHafalan } from '../models/models.js';
import {where} from "sequelize";
import {separateMapel} from "./KelasController.js";
import sequelize from "../config/Database.js";



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
            const nilaiMurid = await NilaiMapel.create({
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
                const createdNilai = await NilaiMapel.bulkCreate(preparedData, { validate: true });
    
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
            const nilaiMurid = await NilaiMapel.findAll({
                where: { id_murid: id_murid },
                include: [
                    { model: Mapel, attributes: ['id_mapel','nama_mapel'] }
                ]
            });

            const result = nilaiMurid.map(record => {
                return {
                    id_murid: murid.id_murid, 
                    nama_murid: murid.nama_murid, 
                  //  id_kelas: record.Kela.id_kelas, //Kelas menjadi "Kela" karena babi sequelize tetep menghapus S di model name ...sayaa tidak tau pushing bang!
                    //nama_kelas: record.Kela.nama_kelas, //Kelas menjadi "Kela" karena babi sequelize tetep menghapus S di model name ...sayaa tidak tau pushing bang!
                    id_mapel: record.Mapel.id_mapel,
                    nama_mapel: record.Mapel.nama_mapel,
                    nilai: record.isi_nilai
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
            const kelasList = await NilaiMapel.findAll(
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

            const nilaiMapelList = await NilaiMapel.findAll({
                where: { id_mapel: id_mapel },
                include: [{
                    model: Murid,
                    as: 'Murid',
                    required: false,
                    where: [{ id_kelas: id_kelas}]
                },{ model: Mapel, attributes: ['id_mapel','nama_mapel'] },]
            });


            const result = nilaiMapelList.map(record => {

                return {
                    id_murid: record.id_murid,
                    nama_murid: record.Murid.nama_murid,  //Kelas menjadi "Kela" karena babi sequelize tetep menghapus S di model name ...sayaa tidak tau pushing bang!
                    status_murid:record.Murid.isBoyong,
                    id_mapel: record.Mapel.id_mapel,
                    nama_mapel: record.Mapel.nama_mapel,
                    isi_nilai: record.isi_nilai
                };
            })

            const filteredResult = result.filter(item => item.status_murid === false);

            res.status(200).json(filteredResult);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async addNilaiMapelByIdKelas(req, res) {
        try {
            const { id_kelas, id_mapel } = req.query;
            const cabangIlmuByIdMapel = await Mapel.findOne({
                where: {id_mapel : id_mapel}
            });
            // Cari murid-murid yang sesuai dengan id_kelas
            const muridList = await Murid.findAll({
                where: { id_kelas: id_kelas }
            });
    
            if (muridList.length === 0) {
                return res.status(404).json({ message: 'Tidak ada murid di kelas ini' });
            }
    
            const filteredMuridList = [];
            for (const murid of muridList) {
                const existingNilai = await NilaiMapel.findOne({
                    where: {
                        id_murid: murid.id_murid,
                        id_mapel
                    }
                });
    
                if (!existingNilai) {
                    filteredMuridList.push({
                        id_murid: murid.id_murid,
                        id_mapel,
                        isi_nilai: 0,
                        id_fan:cabangIlmuByIdMapel.id_fan // Nilai default
                    });
                }
            }
    
            // Bulk create nilai untuk murid yang belum memiliki nilai
            const createdNilai = await NilaiMapel.bulkCreate(filteredMuridList, { validate: true });
    
            res.status(201).json(createdNilai)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addNilaiMapelByIdKelasAuto(req, res) {
        try {
            const { id_kelas } = req.query;
            const daftarKelas = await Kelas.findAll(
                {where: {id_kelas:id_kelas},
                include:{model:Murid}
                }
            )
            const daftarMuridDiKelas = daftarKelas[0].Murids

            //mendapatkan id angkatan kelas lalu mendapatkan daftar mapel yang diikuti
            const daftarMapel = await Mapel.findAll({
                where:{id_angkatan:daftarKelas[0].id_angkatan}
            })



            for (const student of daftarMuridDiKelas) {
                for (const mapel of daftarMapel) {
                    // Use findOrCreate to check if the NilaiMapel entry exists
                    await NilaiMapel.findOrCreate({
                        where: {
                            id_murid: student.id_murid,
                            id_mapel: mapel.id_mapel
                        },
                        defaults: {
                            status_taftisan: false,
                            isi_nilai: 0,
                            id_fan:mapel.id_fan
                        }
                    });

                }
            }


            res.status(201).json("Berhasil Dibuat!")
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateNilaiMurid(req, res) {
        try {
            const { id, id_mapel, isi_nilai } = req.query;
            const updated = await NilaiMapel.update({  id_mapel,isi_nilai }, {
                where: { id_murid: id,id_mapel:id_mapel},
            });

            if (updated) {
                const updatedMurid = await NilaiMapel.findOne(
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


    static async getStatusTaftisan(req, res) {
        try {

            // Step 1 . Ambil Query id_kelas, lalu cari siapa saja yang berada di kelas itu?
            const { id_kelas } = req.query;
            const daftarKelas = await Kelas.findAll(
                {where: {id_kelas:id_kelas},
                    include: [{
                        model: Murid,
                        where: { isBoyong: false }, // Add this line to filter Murid records
                        required: false // Optional based on your requirements
                    }]
                }
            )
            //Ambil nama-nama muridnya saja
            const daftarMuridDiKelas = daftarKelas[0].Murids

            //filter data raw sql ke json (diambil dataValuesnya saja)
            const jsonData = daftarMuridDiKelas.map((murid) => murid.dataValues);

            // sekarang dari nama_murid yang telah didapat cari data NilaiMapelnya dia berapa?
            const fetchPromises = jsonData.map(murid =>
                NilaiMapel.findAll({
                    where: { id_murid: murid.id_murid },
                    include:[{model:Mapel},{model:Murid}]
                })
            );
            const results = await Promise.all(fetchPromises);

            //di ratakan dulu biar gampang dibaca (sebenernya gak perlu)
            const flattenedResults = results.flat();
            const jsonResults = flattenedResults.map(result => result.toJSON());
            const finalData = jsonResults.map(record =>{
                return {
                    id_murid:record.id_murid,
                    nama_murid:record.Murid.nama_murid,
                    id_mapel:record.id_mapel,
                    nama_mapel:record.Mapel.nama_mapel,
                    status_taftisan:record.status_taftisan
                }

            })


            //2. Cari Mapel Utama (yang wajib taftis) pada kelas tersebut
            const mapelUtama = await Mapel.findAll({
                where: { id_angkatan: daftarKelas[0].id_angkatan},});


            const rawToJson =  mapelUtama.map((data) => data.dataValues)
            let id_mapel_utama = separateMapel(rawToJson).idsMapelUtama

            const filteredDataMurid = finalData.filter(murid => id_mapel_utama.includes(murid.id_mapel));

            // nama_kelas: groupedByMurid[id_murid][0].nama_kelas,
            // tadi kan udah dapat data murid dan status taftisanya, nah sekarang di rapihkan biar frontend enak
            const groupedByMurid = filteredDataMurid.reduce((accumulator, current) => {
                if (!accumulator[current.id_murid]) {
                    accumulator[current.id_murid] = [];
                }
                accumulator[current.id_murid].push(current);
                return accumulator;
            }, {});


            //3. jadikan recod baru ya biar FE enak kocak
            const finalDataTaftisan = Object.keys(groupedByMurid).map(id_murid => {
                return {
                    id_murid: id_murid,
                    nama_murid: groupedByMurid[id_murid][0].nama_murid,
                    data_taftisan: groupedByMurid[id_murid]
                };
            });


            res.status(201).json(finalDataTaftisan)


        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async getAllStatusTaftisan(req, res) {
        try {



            // console.log(kelasss)
            //Ambil nama-nama muridnya saja
            const daftarMurid = await Murid.findAll({
                where:{isBoyong:false},
                include:[{model:Kelas}]
            })

            const filterDataMurid =daftarMurid.map((murid) =>
                murid.dataValues
            );
            const fetchPromises = filterDataMurid.map(murid =>
                NilaiMapel.findAll({
                    where: { id_murid: murid.id_murid },
                    include:[{model:Mapel},{model:Murid, include:[{model:Kelas}]}]
                })
            );
            const results = await Promise.all(fetchPromises);
            const flattenedResults = results.flat();
            const jsonResults = flattenedResults.map(result => result.toJSON());
            const finalData = jsonResults.map(record =>{
                return {
                    id_murid:record.id_murid,
                    nama_murid:record.Murid.nama_murid,
                    nama_kelas:record.Murid.Kela.nama_kelas,
                    id_mapel:record.id_mapel,
                    nama_mapel:record.Mapel.nama_mapel,
                    status_taftisan:record.status_taftisan
                }

            })

            const  dataAngkatan = await Angkatan.findAll({
                include:[{model:Mapel}]
            })
            const filterDataAngkatan = dataAngkatan.map((angkatan)=>angkatan.dataValues)

            const { mapelUtamaIds, mapelOpsionalIds } = categorizeMapels(filterDataAngkatan);
            const filteredDataMurid = finalData.filter(murid => mapelUtamaIds.includes(murid.id_mapel));

            const groupedByMurid = filteredDataMurid.reduce((accumulator, current) => {
                if (!accumulator[current.id_murid]) {
                    accumulator[current.id_murid] = [];
                }
                accumulator[current.id_murid].push(current);
                return accumulator;
            }, {});


            //3. jadikan recod baru ya biar FE enak kocak
            const finalDataTaftisan = Object.keys(groupedByMurid).map(id_murid => {
                const taftisanData = groupedByMurid[id_murid];

                // Check if all status_taftisan are true
                const sudahLengkap = taftisanData.every(taftisan => taftisan.status_taftisan);

                // Gather Mapel where status_taftisan is false
                const yangKurang = taftisanData.filter(taftisan => !taftisan.status_taftisan).map(taftisan => {
                    return {
                        id_murid: taftisan.id_murid,
                        nama_murid: taftisan.nama_murid,
                        id_mapel: taftisan.id_mapel,
                        nama_mapel: taftisan.nama_mapel,
                        status_taftisan: taftisan.status_taftisan
                    };
                });

                return {
                    id_murid: id_murid,
                    nama_murid: taftisanData[0].nama_murid,
                    nama_kelas: groupedByMurid[id_murid][0].nama_kelas,
                    data_taftisan: taftisanData,
                    sudah_lengkap: sudahLengkap,
                    yang_kurang: yangKurang
                };
            });

            res.status(201).json(finalDataTaftisan)


        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }



    static async updateStatusTaftisan(req, res) {
        try {
            const updatesArray = req.body; // Expecting an array of objects

            // Perform all updates in a single transaction
            const transactionResult = await sequelize.transaction(async (transaction) => {
                const updateResults = [];

                for (const update of updatesArray) {
                    const { id_murid, id_mapel, status_taftisan } = update;
                    const [numberOfAffectedRows] = await NilaiMapel.update({ status_taftisan }, {
                        where: { id_murid: id_murid, id_mapel: id_mapel },
                        transaction
                    });

                    if (numberOfAffectedRows > 0) {
                        const updatedRecord = await NilaiMapel.findOne({
                            where: { id_murid: id_murid, id_mapel: id_mapel },
                            transaction
                        });
                        updateResults.push(updatedRecord);
                    }
                }

                return updateResults;
            });

            console.log( req.body)

            if (transactionResult.length > 0) {
                res.status(200).json(transactionResult);
            } else {
                res.status(404).json({ message: 'No records updated' });
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async createNilaiHafalan  (req, res) {
        try {
            const { id_murid, pencapaian, kelancaran, kejelasan } = req.body;

            // Create single record
            const nilaiHafalan = await NilaiHafalan.create({
                id_murid,
                pencapaian,
                kelancaran,
                kejelasan,
            });

            return res.json({
                message: 'Nilai hafalan created successfully!',
                data: nilaiHafalan,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async createBatchNilaiHafalan  (req, res) {
        try {

            const nilaiHafalanData = req.body; // Array of objects with NilaiHafalan properties

            // Bulk create using Promise.all
            const createdNilaiHafalan = await Promise.all(
                nilaiHafalanData.map((data) => NilaiHafalan.create(data))
            );

            return res.json({
                message: `${createdNilaiHafalan.length} Nilai hafalan created successfully!`,
                data: createdNilaiHafalan,
            });



        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async createBatchNilaiHafalanAutoByIdKelas  (req, res) {
        try {
            const { id_kelas } = req.query;
            const daftarKelas = await Kelas.findAll(
                {where: {id_kelas:id_kelas},
                    include:{model:Murid}
                }
            )
            const daftarMuridDiKelas = daftarKelas[0].Murids

            for (const murid of daftarMuridDiKelas){
                await NilaiHafalan.findOrCreate({
                    where:{id_murid:murid.id_murid},
                    defaults:{
                        pencapaian:0,
                        kelancaran:0,
                        artikulasi:0
                    }
                })
            }





            res.status(201).json("Berhasil Dibuat!")
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async getNilaiHafalan  (req, res) {
        try {

            const { id_kelas } = req.query;

            if (id_kelas) {
                const daftarKelas = await Kelas.findAll(
                    {where: {id_kelas:id_kelas},
                        include:{model:Murid}
                    }
                )
                const daftarMuridDiKelas = daftarKelas[0].Murids
                // const babi = await NilaiHafalan
                const jsonData = daftarMuridDiKelas.map((murid) => murid.dataValues);
                const fetchPromises = jsonData.map(murid =>
                    NilaiHafalan.findAll({
                        where: { id_murid: murid.id_murid }
                    })
                );

                const results = await Promise.all(fetchPromises);
                // Flatten the array of arrays into a single array
                const flattenedResults = results.flat();

                // Optional: Map the results to include only specific fields
                const finalResults = flattenedResults.map(hafalan => {
                    return {
                        id_murid: hafalan.id_murid,
                        pencapaian: hafalan.pencapaian,
                        kelancaran: hafalan.kelancaran,
                        artikulasi: hafalan.artikulasi
                    };
                });
                console.log(finalResults)

                return res.json( flattenedResults );
            }

            const allNilaiHafalan = await NilaiHafalan.findAll();
            return res.json( allNilaiHafalan );



        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }



    static async updateNilaiHafalan (req, res) {
        try {
            const { id_murid, pencapaian, kelancaran, artikulasi } = req.body;

            console.log(req.body)
            const nilaiHafalan = await NilaiHafalan.findOne(
                {
                    where:{id_murid:id_murid}
                }

            );
            if (!nilaiHafalan) return res.status(404).json({ message: 'Nilai hafalan not found' });
            await nilaiHafalan.update({ pencapaian, kelancaran, artikulasi });
            return res.json({ message: 'Nilai hafalan updated successfully!', data: nilaiHafalan})



            } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // static async (req, res) {
    //     try {
    //
    //
    //
    //
    //
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }
    // static async (req, res) {
    //     try {
    //
    //
    //
    //
    //
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }
    // static async (req, res) {
    //     try {
    //
    //
    //
    //
    //
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }
    // static async (req, res) {
    //     try {
    //
    //
    //
    //
    //
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }


   
}

function categorizeMapels(dataAngkatan) {
    const mapelUtamaIds = [];
    const mapelOpsionalIds = [];

    dataAngkatan.forEach(angkatan => {
        let isUtama = true;

        angkatan.Mapels.forEach(mapel => {
            if (mapel.nama_mapel === "Riyadloh") {
                isUtama = false;
            }

            if (isUtama) {
                mapelUtamaIds.push(mapel.id_mapel);
            } else {
                mapelOpsionalIds.push(mapel.id_mapel);
            }
        });
    });

    return { mapelUtamaIds, mapelOpsionalIds };
}
