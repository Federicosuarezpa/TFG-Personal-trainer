import dotenv from 'dotenv';
import {Sequelize} from "sequelize";

dotenv.config({ path: '../.env' });

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
});

export default sequelize;
