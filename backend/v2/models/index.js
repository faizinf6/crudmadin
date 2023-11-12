import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

// Definisi model Murid
class Murid extends Model {}
Murid.init({
  id_murid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true
  },
  nama_murid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_kelas: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  isBoyong: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, { sequelize, modelName: 'Murid', freezeTableName: true });

// Definisi model Kelas
class Kelas extends Model {}
Kelas.init({
  id_kelas: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true
  },
  nama_kelas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_angkatan: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, { sequelize, modelName: 'Kelas', freezeTableName: true });

// Definisi model Angkatan
class Angkatan extends Model {}
Angkatan.init({
  id_angkatan: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true
  },
  nama_angkatan: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'Angkatan', freezeTableName: true });

// Definisi model Mapel
class Mapel extends Model {}
Mapel.init({
  id_mapel: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true
  },
  nama_mapel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_angkatan: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, { sequelize, modelName: 'Mapel', freezeTableName: true });

class NilaiMurid extends Model {}
NilaiMurid.init({
  id_nilai: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_murid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  id_kelas: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  id_mapel: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  nilai: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, { sequelize, modelName: 'NilaiMurid', freezeTableName: true });


// Mendefinisikan hubungan antar model
Murid.belongsTo(Kelas, { foreignKey: 'id_kelas' });
Kelas.hasMany(Murid, { foreignKey: 'id_kelas' });

Kelas.belongsTo(Angkatan, { foreignKey: 'id_angkatan' });
Angkatan.hasMany(Kelas, { foreignKey: 'id_angkatan' });

Angkatan.hasMany(Mapel, { foreignKey: 'id_angkatan' });
Mapel.belongsTo(Angkatan, { foreignKey: 'id_angkatan' });

NilaiMurid.belongsTo(Murid, { foreignKey: 'id_murid' });
NilaiMurid.belongsTo(Kelas, { foreignKey: 'id_kelas' });
NilaiMurid.belongsTo(Mapel, { foreignKey: 'id_mapel' });
// Synchronize semua model dengan database
async function syncModels() {
  try {
    await sequelize.sync();
    console.log("Semua model telah disinkronkan dengan database.");
  } catch (error) {
    console.error("Gagal menyinkronkan model dengan database: ", error);
  }
}

syncModels();
//{force: true}
export { Murid, Kelas, Angkatan, Mapel,NilaiMurid };