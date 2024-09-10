import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

// Definisi entitas Murid
const Murid = sequelize.define('murid', {
  id_murid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
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
    defaultValue:false
  },
  rfid:{
    type:DataTypes.STRING,
    allowNull: false
  },
  no_ujian:{
    type:DataTypes.STRING,
    allowNull: false
  }

}, { freezeTableName: true, timestamps: false });

// Definisi entitas Kelas
const Kelas = sequelize.define('kelas', {
  id_kelas: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false
  },
  nama_kelas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_angkatan: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, { freezeTableName: true, timestamps: false });

// Definisi entitas Angkatan
const Angkatan = sequelize.define('angkatan', {
  id_angkatan: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false
  },
  nama_angkatan: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { freezeTableName: true, timestamps: false });

// Definisi entitas Mapel
const Mapel = sequelize.define('mapel', {
  id_mapel: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false
  },
  nama_mapel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_angkatan: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  id_fan: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { freezeTableName: true, timestamps: false });

// Definisi entitas NilaiMapel
const NilaiMapel = sequelize.define('nilaimapel', {
  id_nilai: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_murid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_mapel: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },

  status_taftisan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isi_nilai: {
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  }
}, { freezeTableName: true, timestamps: false });

// Definisi entitas CabangIlmu
const CabangIlmu = sequelize.define('cabangilmu', {
  id_fan: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nama_fan: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { freezeTableName: true, timestamps: false });

// Definisi entitas Kehadiran
const Kehadiran = sequelize.define('kehadiran', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_murid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alpha: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false

  },
  izin: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false

  },
  sakit: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false

  }
}, { freezeTableName: true, timestamps: false });
const NilaiHafalan = sequelize.define('nilaihafalan', {

  id_murid: {
    type: DataTypes.STRING,
    primaryKey:true,
    allowNull: false
  },
  pencapaian: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue:0
  },

  nilai_pencapaian: {
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
    defaultValue:0.0
  },
  kelancaran: {
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
    defaultValue:0.0
  },
  artikulasi: {
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
    defaultValue:0.0
  }
}, { freezeTableName: true, timestamps: false });

const Admin = sequelize.define('admin', {
  id_admin: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement:true
  },
  nama_admin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  no_hp: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  id_kelas: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  isSuperAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true, timestamps: false
});

// Asosiasi antara Kelas dan Murid
Kelas.hasMany(Murid, { foreignKey: 'id_kelas' });
Murid.belongsTo(Kelas, { foreignKey: 'id_kelas' });

// Asosiasi antara Angkatan, Kelas, dan Mapel
Angkatan.hasMany(Kelas, { foreignKey: 'id_angkatan' });
Kelas.belongsTo(Angkatan, { foreignKey: 'id_angkatan' });
Angkatan.hasMany(Mapel, { foreignKey: 'id_angkatan' });
Mapel.belongsTo(Angkatan, { foreignKey: 'id_angkatan' });

// Asosiasi antara NilaiMapel, Murid, dan Mapel
Murid.hasMany(NilaiMapel,{foreignKey:'id_murid'})
NilaiMapel.belongsTo(Murid, { foreignKey: 'id_murid' });
NilaiMapel.belongsTo(Mapel, { foreignKey: 'id_mapel' });

Murid.hasOne(NilaiHafalan,{foreignKey:'id_murid'})
NilaiHafalan.belongsTo(Murid,{foreignKey:'id_murid'})

// Asosiasi antara CabangIlmu dengan NilaiMapel dan Mapel
CabangIlmu.hasMany(NilaiMapel, { foreignKey: 'id_fan' });
CabangIlmu.hasMany(Mapel, { foreignKey: 'id_fan' });
Mapel.belongsTo(CabangIlmu, { foreignKey: 'id_fan' });




// Synchronize semua model dengan database
async function syncModels() {
  try {
    // await sequelize.sync({force: true});
    await sequelize.sync();

    console.log("Semua model telah disinkronkan dengan database.");
  } catch (error) {
    console.error("Gagal menyinkronkan model dengan database: ", error);
  }
}

syncModels();
// Export models

export { Murid, Kelas, Angkatan, Mapel, NilaiMapel, CabangIlmu, Kehadiran,Admin,NilaiHafalan };
