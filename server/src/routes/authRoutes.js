import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Validare simplă
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Toate câmpurile sunt obligatorii" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Parola trebuie să fie de cel puțin 6 caractere" });
        }

        // Verifică unicitatea emailului
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Emailul este deja înregistrat" });
        }

        // Criptează parola
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crează utilizatorul
        const newUser = await User.create({ name, password: hashedPassword, email });

        // Răspunsul (fără parolă)
        res.status(201).json({
            message: 'Utilizator înregistrat cu succes',
            user: {
                id: newUser.idCandidate,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta pentru autentificare
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ error: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Autentificare reușită', user: { id: user.idCandidate, name: user.name, email: user.email } });
        });
    })(req, res, next);
});

// Ruta pentru deconectare
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

export default router;
