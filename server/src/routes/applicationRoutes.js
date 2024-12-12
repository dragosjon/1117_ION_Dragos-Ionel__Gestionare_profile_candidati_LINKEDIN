import express from 'express';
import Application from '../models/Application.js';

const router = express.Router();

// POST - Creare o nouă aplicație
router.post('/', async (req, res) => {
    try {
        const application = await Application.create(req.body);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET - Obtinere toate aplicațiile
router.get('/', async (req, res) => {
    try {
        const applications = await Application.findAll();
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Obtinere o singură aplicație prin ID
router.get('/:id', async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id);
        if (application) {
            res.json(application);
        } else {
            res.status(404).json({ error: 'Aplicația nu a fost găsită' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Actualizare o aplicație
router.put('/:id', async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id);
        if (application) {
            await application.update(req.body);
            res.json(application);
        } else {
            res.status(404).json({ error: 'Aplicația nu a fost găsită' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Ștergere o aplicație
router.delete('/:id', async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id);
        if (application) {
            await application.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Aplicația nu a fost găsită' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
