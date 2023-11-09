import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';
// Mengganti konfigurasi database Anda yang sesuai di sini.

class Murid extends Model {}
Murid.init({
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM("L","P"),
    allowNull: false
  },
  isBoyong: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, { sequelize, modelName: 'murid' });

class JenjangKelas extends Model {}
JenjangKelas.init({
  namaJenjang: DataTypes.STRING // '4 ibt', '5 ibt', '6 ibt', '1 tsn', etc.
}, { sequelize, modelName: 'jenjangKelas' });

class Kelas extends Model {}
Kelas.init({
  waktuKelas: DataTypes.ENUM('pg', 'sg'),
  jenisKelas: DataTypes.ENUM('pa', 'pi'),
  pembagianKelas: DataTypes.STRING // 'A', 'B', 'C', etc.
}, { sequelize, modelName: 'kelas' });

// Mendefinisikan hubungan
Murid.belongsTo(Kelas, { foreignKey: 'kelasId' });
Kelas.hasMany(Murid, { foreignKey: 'kelasId' });
Kelas.belongsTo(JenjangKelas, { foreignKey: 'jenjangKelasId' });
JenjangKelas.hasMany(Kelas, { foreignKey: 'jenjangKelasId' });

// Synchronize the models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

async () => {
  await sequelize.sync({force: true }).then(() => {
    console.log('Database & tables created!');


  })};


// Export models if needed for external use
export { Murid, JenjangKelas, Kelas };
