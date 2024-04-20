// routes/qscore/qscoresResultRoutes.js

const express = require('express');
const router = express.Router();
const QscoresResultModel = require('../../models/qscore/qscoresResultModel');

router.get('/', async (req, res) => {
    try {
        const qscoresResults = await QscoresResultModel.fetchAllQscoresResults();
        res.json(qscoresResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const qscoresResult = await QscoresResultModel.fetchQscoresResultById(req.params.id);
        if (!qscoresResult) {
            return res.status(404).json({ message: 'Qscores result not found' });
        }
        res.json(qscoresResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newQscoresResult = await QscoresResultModel.createQscoresResult(req.body);
        res.status(201).json(newQscoresResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedQscoresResult = await QscoresResultModel.updateQscoresResult(req.params.id, req.body);
        if (!updatedQscoresResult) {
            return res.status(404).json({ message: 'Qscores result not found' });
        }
        res.json(updatedQscoresResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedQscoresResult = await QscoresResultModel.deleteQscoresResult(req.params.id);
        if (!deletedQscoresResult) {
            return res.status(404).json({ message: 'Qscores result not found' });
        }
        res.status(200).json({ message: 'Qscores result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
