import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

class Application extends Model {}

Application.init({
    // Atributele modelului Application

    applicationID:{
        type:DataTypes.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },

    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    userId: { // Cheia străină pentru User
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'application'
});

// Relația cu modelul User
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

export default Application;
