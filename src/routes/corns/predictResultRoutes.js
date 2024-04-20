const express = require('express');
const router = express.Router();
const { 
    fetchAllPredictRecords, 
    fetchPredictRecordById, 
    createPredictRecord, 
    updatePredictRecord, 
    deletePredictRecord
} = require('../../models/corns/predictResultModel'); // Ensure the model file path is correct
const asyncHandler = require('../../middleware/asyncHandler');
const { sendSuccess, sendError } = require('../../utils/responseHandlers');

router.get('/', asyncHandler(async (req, res) => {
    const results = await fetchAllPredictRecords();
    sendSuccess(res, results.data, 200);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const result = await fetchPredictRecordById(req.params.id);
    if (!result.success) {
        return sendError(res, 'Class record not found', 404);
    }
    sendSuccess(res, result.data, 200);
}));

router.post('/', asyncHandler(async (req, res) => {
    const newResult = await createPredictRecord(req.body);
    if (!newResult.success) {
        return sendError(res, 'Error creating class record', 400);
    }
    sendSuccess(res, newResult.data, 201);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const updatedResult = await updatePredictRecord(req.params.id, req.body);
    if (!updatedResult.success) {
        return sendError(res, 'Class record not found', 404);
    }
    sendSuccess(res, updatedResult.data, 200);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedResult = await deletePredictRecord(req.params.id);
    if (!deletedResult.success) {
        return sendError(res, 'Class record not found', 404);
    }
    sendSuccess(res, { message: 'Class record deleted successfully' }, 200);
}));

module.exports = router;