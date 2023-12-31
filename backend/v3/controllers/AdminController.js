import {Admin, Kelas} from '../models/models.js';// Sesuaikan dengan lokasi file model Anda

export class AdminController {
    // Create
    static async createAdmin(req, res) {
        try {
            const { id_admin,nama_admin, no_hp, id_kelas, isSuperAdmin, password } = req.body;

            const admin = await Admin.create({ id_admin,nama_admin,no_hp,id_kelas,isSuperAdmin,password });
            res.status(201).json(admin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Read
    static async getAllAdmin(req, res) {
        try {
            const admins = await Admin.findAll();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getWesLoginUrung(req, res) {
        const { no_hp, password } = req.body;
        try {
                const admin = await Admin.findOne({
                    where: {
                        no_hp: no_hp  // Mengingat Anda tidak menggunakan hash
                    },
                    // attributes: ['id_admin', 'nama_admin','email','password',"id_kelas","isSuperAdmin"]
                });




            if (admin && admin.password === password) {
                req.session.user = { id: admin.id_admin, no_hp: admin.no_hp };
                const nama_kelas = await  Kelas.findByPk(admin.id_kelas)




                // res.json({ id: admin.id_admin, email: admin.email });
                res.json({ nama_admin:admin.nama_admin,id_kelas:admin.id_kelas,id_admin:admin.id_admin,nama_kelas:nama_kelas.nama_kelas,super_admin:admin.isSuperAdmin,status_login: true,no_hp:admin.no_hp });
                //res.json(admin);
            } else {
                res.json({ status_login: false });
            }
        } catch (error) {
            res.status(500).send('celeng Terjadi kesalahan pada server');
        }



        // try {
        //     const { email, password } = req.body;
        //
        //     const admin = await Admin.findOne({
        //         where: {
        //             email: email,
        //             password: password  // Mengingat Anda tidak menggunakan hash
        //         }
        //     });
        //
        //     if (admin) {
        //         res.json({
        //             status:true,
        //         });
        //     } else {
        //         res.json({
        //             status:false,
        //             penyebab:'Email atau Katasandi Salah'
        //         });
        //     }
        // } catch (error) {
        //     res.status(500).json({ message: error.message });
        // }
    }

    // Update
    static async updateAdmin(req, res) {
        try {

            const { id_admin, ...updateData } = req.body;
            const admin = await Admin.findByPk(id_admin);
            if (!admin) {
                return res.status(404).send({ message: 'Admin not found' });
            }

            await admin.update(updateData);
            res.status(200).send(admin);

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

    static async createManyAdmin(req, res) {
        try {
            const admins = req.body; // Ini adalah array murid

            // Memastikan bahwa request adalah array
            if (!Array.isArray(admins)) {
                return res.status(400).json({ message: 'Input harus berupa array' });
            }

            // Menambahkan semua murid ke dalam database
            const created_admins = await Admin.bulkCreate(admins, { validate: true });

            res.status(201).json(created_admins);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }









}

export default AdminController;
