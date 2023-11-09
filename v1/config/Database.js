import { Sequelize } from "sequelize";

const sequelize = new Sequelize('madinkuv1', 'root','admin',{
    host: 'localhost',
    dialect:'mysql'
})

export default sequelize;
