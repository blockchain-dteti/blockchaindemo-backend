import { Sequelize } from 'sequelize';

const db = new Sequelize('mappingDIY','postgres','raven03',{
    host: 'localhost',
    dialect: 'postgres'
});

export default db;