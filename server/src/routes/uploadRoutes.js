import express from 'express';
import multer from 'multer';
import User from '../models/User.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-cv', upload.single('cv'), async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByPk(userId);
        if (user) {
            user.cvPath = req.file.path;
            await user.save();
            res.send('CV încărcat cu succes');
        } else {
            res.status(404).send('Utilizatorul nu a fost găsit');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
