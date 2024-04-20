// routes/qscore/qscoresRoutes.js

const express = require('express');
const router = express.Router();
const qscoresModel = require('../../models/qscore/qscoresModel');
const QscoresResultModel = require('../../models/qscore/qscoresResultModel');

router.get('/', async (req, res) => {
    try {
        const qscores = await qscoresModel.fetchAllQscores();
        res.json(qscores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:qscore_id', async (req, res) => {
    try {
        const qscore = await qscoresModel.fetchQscoreById(req.params.qscore_id);
        if (!qscore) {
            return res.status(404).json({ message: 'Qscore not found' });
        }
        res.json(qscore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newQscore = await qscoresModel.createQscore(req.body);
        res.status(201).json(newQscore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:qscore_id', async (req, res) => {
    try {
        const updatedQscore = await qscoresModel.updateQscore(req.params.qscore_id, req.body);
        if (!updatedQscore) {
            return res.status(404).json({ message: 'Qscore not found' });
        }
        res.json(updatedQscore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:qscore_id', async (req, res) => {
    try {
        const deletedQscore = await qscoresModel.deleteQscore(req.params.qscore_id);
        if (!deletedQscore) {
            return res.status(404).json({ message: 'Qscore not found' });
        }
        res.status(200).json({ message: 'Qscore deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/search', async (req, res) => {
    console.log(req.body);
    const { vendor, material, instlot, batch, plant } = req.body;
    
    // Check for the presence of required fields: 'vendor' and 'material'
    if (!vendor || !material) {
        return res.status(400).json({ message: 'Vendor and Material are required' });
    }

    console.log(`Searching for Vendor: ${vendor}, Material: ${material}, Instlot: ${instlot}, Batch: ${batch}, Plant: ${plant}`);

    try {
        const result = await qscoresModel.searchByVendorAndMaterial(vendor, material);
        
        // Process the result
        if (result) {
            console.log('Database result found:', result);
            const savedResult = await QscoresResultModel.createQscoresResult({
                instlot,
                batch,
                plant,
                vendor,
                material,
                evaluate: result.evaluate || "Pass Through 100%", // Default value if 'evaluate' is not provided
                sampling: result.sampling || "No Sampling"          // Default value if 'sampling' is not provided
            });
            res.status(201).json(savedResult);
            console.log('savedResult =', savedResult);
        } else {
            // If no results are found in the database, respond with default values
            console.log('No database result found, using default values');
            const defaultResult = {
                instlot,
                batch,
                plant,
                vendor,
                material,
                evaluate: "Normal Inspection", // Default value for 'evaluate' when not found
                sampling: "Sampling"           // Default value for 'sampling' when not found
            };
            // You might still want to save this default result in the database
            await QscoresResultModel.createQscoresResult(defaultResult);
            res.status(200).json(defaultResult);  // Using 200 OK to indicate a default response
            console.log('Default result saved and returned:', defaultResult);
        }
    } catch (error) {
        console.error('Error during search operation:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
