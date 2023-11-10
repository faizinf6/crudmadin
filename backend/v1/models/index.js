import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';
// Mengganti konfigurasi database Anda yang sesuai di sini.

class Kelas extends Model {}
Kelas.init({
  // attributes
  waktu_kelas: {
    type: DataTypes.ENUM('pg', 'sg'),
    allowNull: false
  },
  jenis_kelas: {
    type: DataTypes.ENUM('pa', 'pi'),
    allowNull: false
  },
  jenjang_kelas: {
    type: DataTypes.ENUM('4 ibt', '5 ibt', '6 ibt', '1 tsn', '2 Tsn', '3 Tsn', '1 Aly', '2 Aly'),
    allowNull: false
  },
  pembagian_kelas: {
    type: DataTypes.STRING(1),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Kelas'
  // options
});

class Murid extends Model {}
Murid.init({
  // attributes
  Nama: {
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
    defaultValue:false
  },kelasId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Kelas,
      key: 'id',
    }}
}, {
  sequelize,
  modelName: 'Murid'
  // options
});

// Defining the relationship
Kelas.hasMany(Murid, {
  foreignKey: 'kelasId',
  as: 'murid'
});
Murid.belongsTo(Kelas, {
  foreignKey: 'kelasId',
  as: 'kelas'
});

// Synchronize the models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

async () => {
  await sequelize.sync().then(() => {
    console.log('Database & tables created!');


  })};


// Export models if needed for external use
export { Murid, Kelas };
