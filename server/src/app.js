import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Application from './models/Application.js';
import userRoutes from './routes/userRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import sequelize from './config/db.js';
import flash from 'connect-flash';
import session from 'express-session';

const app = express();

// Configurarea sesiunii Express
app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true
}));

// Configurarea connect-flash
app.use(flash());

// Inițializarea Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurarea strategiei locale Passport pentru a folosi emailul
passport.use(new LocalStrategy({
        usernameField: 'email',  // Schimbare de la 'username' la 'email'
        passwordField: 'password'
    },
    async function(email, password, done) {
        try {
            const user = await User.findOne({ where: { email } }); // Folosește emailul pentru căutare
            if (!user) {
                return done(null, false, { message: 'Email inexistent.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Parolă incorectă.' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serializarea utilizatorului în sesiune
passport.serializeUser((user, done) => {
    done(null, user.idCandidate);
});

// Deserializarea utilizatorului din sesiune
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Construiește __dirname în ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware pentru parsarea JSON-ului din cererile HTTP
app.use(express.json());

// Middleware pentru CORS (permite cererile cross-origin)
app.use(cors());

// Definirea rutelor API
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

// The "catchall" handler for the React app
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Sincronizează modelele cu baza de date
sequelize.sync({ force: true }).then(() => {
    console.log('Tabelele au fost create cu succes.');
}).catch((error) => {
    console.error('Eroare la crearea tabelelor:', error);
});

// Setarea portului pe care va asculta serverul
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});

export default app;