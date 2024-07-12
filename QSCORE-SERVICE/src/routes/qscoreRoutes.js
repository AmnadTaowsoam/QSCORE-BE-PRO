const express = require('express');
const router = express.Router();
const qscoreModel = require('../models/qscoreModel');

// Get all qscores
router.get('/qscores', async (req, res) => {
    try {
        const qscores = await qscoreModel.getQscores();
        res.json(qscores);
    } catch (error) {
        console.error('Error getting qscores:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

// Get qscore by ID
router.get('/qscores/:id', async (req, res) => {
    try {
        const qscore = await qscoreModel.getQscoreById(req.params.id);
        if (qscore) {
            res.json(qscore);
        } else {
            res.status(404).json({ error: 'Qscore not found' });
        }
    } catch (error) {
        console.error('Error getting qscore by ID:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

// Create a new qscore
router.post('/qscores', async (req, res) => {
    try {
        const qscore = await qscoreModel.createQscore(req.body);
        res.status(201).json(qscore);
    } catch (error) {
        console.error('Error creating qscore:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

// Update an existing qscore by ID
router.put('/qscores/:id', async (req, res) => {
    try {
        const qscore = await qscoreModel.updateQscore(req.params.id, req.body);
        if (qscore) {
            res.json(qscore);
        } else {
            res.status(404).json({ error: 'Qscore not found' });
        }
    } catch (error) {
        console.error('Error updating qscore:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

// Delete a qscore by ID
router.delete('/qscores/:id', async (req, res) => {
    try {
        await qscoreModel.deleteQscore(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting qscore:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

// Search qscores (not implemented)
router.get('/qscores/search', async (req, res) => {
    res.status(501).json({ error: 'Not implemented' });
});


// Get qscore by vendor and material
router.get('/qscore', async (req, res) => {
    const { vendor, material } = req.query;
    try {
        const qscore = await qscoreModel.getQscoreByVendorAndMaterial(vendor, material);
        if (qscore) {
            res.json(qscore);
        } else {
            res.json({ evaluate: 'Normal Inspection', sampling: 'Sampling' });
        }
    } catch (error) {
        console.error('Error getting qscore by vendor and material:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
