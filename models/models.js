import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

// Definisi entitas Murid
const Murid = sequelize.define('Murid', {
  id_murid: {
    type: DataTypes.BIGINT.UNSIGNED,
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
    allowNull: false
  }
}, { freezeTableName: true, timestamps: false });

// Definisi entitas Kelas
const Kelas = sequelize.define('Kelas', {
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
const Angkatan = sequelize.define('Angkatan', {
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
const Mapel = sequelize.define('Mapel', {
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
const NilaiMapel = sequelize.define('NilaiMapel', {
  id_nilai: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_murid: {
    type: DataTypes.BIGINT.UNSIGNED,
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
    allowNull: false
  }
}, { freezeTableName: true, timestamps: false });

// Definisi entitas CabangIlmu
const CabangIlmu = sequelize.define('CabangIlmu', {
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
const Kehadiran = sequelize.define('Kehadiran', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_murid: {
    type: DataTypes.BIGINT.UNSIGNED,
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
const NilaiHafalan = sequelize.define('NilaiHafalan', {

  id_murid: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey:true,
    allowNull: false
  },
  pencapaian: {
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false
  },
  kelancaran: {
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false
  },
  artikulasi: {
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false
  }
}, { freezeTableName: true, timestamps: false });

const Admin = sequelize.define('Admin', {
  id_admin: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false
  },
  nama_admin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  no_hp: {
    type: DataTypes.BIGINT.UNSIGNED,
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

// Export models



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
export { Murid, Kelas, Angkatan, Mapel, NilaiMapel, CabangIlmu, Kehadiran,Admin,NilaiHafalan };
