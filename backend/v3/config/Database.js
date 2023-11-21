import { Sequelize } from "sequelize";

const sequelize = new Sequelize('madinkuv3', 'root','admin',{
    host: 'localhost',
    dialect:'mysql',
    define: {
        freezeTableName: true
    }
})

export default sequelize;
