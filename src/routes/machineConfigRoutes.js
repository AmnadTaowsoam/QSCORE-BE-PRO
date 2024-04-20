const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator'); 
const asyncHandler = require('express-async-handler');
const machineConfigModel = require('../models/machineConfigModel');
const userModel = require('../models/userModel');

// Define validation rules as an array for reuse
const machineConfigurationValidationRules = [
    body('username', 'Username is required').not().isEmpty().trim().escape(),
    body('email', 'Invalid email address').isEmail().normalizeEmail(),
    body('machine_id').not().isEmpty().withMessage('Machine ID is required'),
    body('machine_ip').isIP().withMessage('Valid Machine IP is required'),
    body('port').isNumeric().withMessage('Valid port is required'),
    body('descriptions').optional()

];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req); // Correctly use validationResult here
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Route to create a new machine configuration
router.post('/machine-configurations', machineConfigurationValidationRules, handleValidationErrors, asyncHandler(async (req, res) => {
    const config = await machineConfigModel.createMachineConfiguration(req.body);
    res.status(201).json(config);
}));

// Route to get a machine configuration by machine ID
router.get('/machine-configurations/:machine_id', asyncHandler(async (req, res) => {
    const config = await machineConfigModel.getMachineConfiguration(req.params.machine_id);
    if (!config) {
        return res.status(404).json({ message: "Machine configuration not found" });
    }
    res.json(config);
}));

// Route to update a machine configuration by machine ID
router.put('/machine-configurations/:machine_id', machineConfigurationValidationRules, handleValidationErrors, asyncHandler(async (req, res) => {
    const config = await machineConfigModel.updateMachineConfiguration(req.params.machine_id, req.body.newMachineIp, req.body.descriptions);
    res.json(config);
}));

// Route to delete a machine configuration by machine ID
router.delete('/machine-configurations/:machine_id', asyncHandler(async (req, res) => {
    const config = await machineConfigModel.deleteMachineConfiguration(req.params.machine_id);
    if (!config) {
        return res.status(404).json({ message: "Machine configuration not found to delete" });
    }
    res.json({ message: "Machine configuration deleted successfully" });
}));

module.exports = router;
