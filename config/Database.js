import { Sequelize } from "sequelize";

import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
});


// const sequelize = new Sequelize('u7910042_madinkuv3', 'u7910042_root','Katasandif6@',{
//     host: 'api.darussaadah.net',
//     dialect:'mysql',
//     define: {
//         freezeTableName: true
//     }
// })



export default sequelize;
