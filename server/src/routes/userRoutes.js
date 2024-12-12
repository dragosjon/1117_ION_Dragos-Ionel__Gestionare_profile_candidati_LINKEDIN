import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST - Creați un nou utilizator
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET - Obțineți toți utilizatorii
router.get('/all', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Obțineți un singur utilizator prin ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilizatorul nu a fost găsit' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Actualizați un utilizator
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilizatorul nu a fost găsit' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Ștergeți un utilizator
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Utilizatorul nu a fost găsit' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
