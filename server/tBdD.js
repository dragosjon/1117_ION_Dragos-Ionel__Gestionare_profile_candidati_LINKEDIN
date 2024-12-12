// Importarea Sequelize și a configurației conexiunii la baza de date
import { Sequelize } from 'sequelize';
import 'dotenv/config.js';
import User from './src/models/User.js'; // Asigurați-vă că calea este corectă
import Application from './src/models/Application.js'; // Importați modelul Application

// Crearea unei instanțe Sequelize cu datele de conectare
const sequelize = new Sequelize('hirehub', 'root', 'Amsni1987!', {
    dialect: 'mysql'
});

// Testarea conectivității și executarea operațiunilor CRUD
sequelize.authenticate()
    .then(() => {
        console.log('Conexiunea la baza de date a fost stabilită cu succes.');

        // Sincronizează modelele User și Application
        return Promise.all([User.sync(), Application.sync()]);
    })
    .then(() => {
        // Crearea unui utilizator nou
        return User.create({ name: 'John Doe', email: 'john@example.com' });
    })
    .then(user => {
        console.log('Utilizator creat:', user.toJSON());

        // Crearea unei aplicații noi
        return Application.create({ jobTitle: 'Developer', userId: user.idCandidate });
    })
    .then(application => {
        console.log('Aplicație creată:', application.toJSON());

        // Citirea tuturor utilizatorilor
        return User.findAll();
    })
    .then(users => {
        console.log('Toți utilizatorii:', users.map(user => user.toJSON()));

        // Actualizarea unui utilizator
        return User.update({ name: 'Jane Doe' }, { where: { email: 'john@example.com' } });
    })
    .then(() => {
        console.log('Utilizator actualizat.');

        //Ștergerea unui utilizator
        return User.destroy({ where: { email: 'john@example.com' } });
    })
    .then(() => {
        console.log('Utilizator șters.');
        return Application.destroy({where: {}})
    })
    .catch(err => {
        console.error('A apărut o eroare:', err);
    });
