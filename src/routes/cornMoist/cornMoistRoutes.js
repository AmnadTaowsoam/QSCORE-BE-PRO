const express = require('express');
const router = express.Router();
const CornMoistModel = require('../../models/cornMoist/cornMoistModel');
const asyncHandler = require('../../middleware/asyncHandler');
const { sendSuccess, sendError } = require('../../utils/responseHandlers');

// Create corn moisture record
router.post('/', asyncHandler(async (req, res) => {
    const newRecord = await CornMoistModel.createCornMoist(req.body);
    if (newRecord) {
        sendSuccess(res, newRecord, 201);
    } else {
        sendError(res, 'Failed to create record', 400);
    }
}));

// Fetch all corn moisture records
router.get('/', asyncHandler(async (req, res) => {
    const records = await CornMoistModel.fetchAllCornMoist();
    sendSuccess(res, records);
}));

// Fetch corn moisture record by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const record = await CornMoistModel.fetchCornMoistById(req.params.id);
    if (record) {
        sendSuccess(res, record);
    } else {
        sendError(res, 'Record not found', 404);
    }
}));

// Update corn moisture record
router.put('/:id', asyncHandler(async (req, res) => {
    const updatedRecord = await CornMoistModel.updateCornMoist(req.params.id, req.body);
    if (updatedRecord) {
        sendSuccess(res, updatedRecord);
    } else {
        sendError(res, 'Failed to update record', 400);
    }
}));

// Delete corn moisture record
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedRecord = await CornMoistModel.deleteCornMoist(req.params.id);
    if (deletedRecord) {
        sendSuccess(res, { message: 'Record deleted successfully' }, 200);
    } else {
        sendError(res, 'Record not found', 404);
    }
}));

module.exports = router;