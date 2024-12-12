import { Sequelize } from 'sequelize';
import 'dotenv/config.js'

const sequelize = new Sequelize('database', 'root', '1234', {
    dialect: 'mysql',
    port: 3306
});

export default sequelize;

