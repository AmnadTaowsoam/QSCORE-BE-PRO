const express = require('express');
const router = express.Router();
const PredictResultModel = require('../../models/cassava/predictResultModel');
const { sendSuccess, sendError } = require('../../utils/responseHandlers');
const asyncHandler = require('../../middleware/asyncHandler');

router.get('/', asyncHandler(async (req, res) => {
    console.log('GET /cassava');
    const results = await PredictResultModel.fetchAllPredictResults();
    sendSuccess(res, results);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    console.log(`GET /cassava/${req.params.id}`);
    const result = await PredictResultModel.fetchPredictResultById(req.params.id);
    if (!result) {
        return sendError(res, 'Predict result not found', 404);
    }
    sendSuccess(res, result);
}));

router.post('/', asyncHandler(async (req, res) => {
    console.log('POST /cassava', req.body);
    const newResult = await PredictResultModel.createPredictResult(req.body);
    sendSuccess(res, newResult, 201);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    console.log(`PUT /cassava/${req.params.id}`, req.body);
    const updatedResult = await PredictResultModel.updatePredictResult(req.params.id, req.body);
    if (!updatedResult) {
        return sendError(res, 'Predict result not found', 404);
    }
    sendSuccess(res, updatedResult);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    console.log(`DELETE /cassava/${req.params.id}`);
    const deletedResult = await PredictResultModel.deletePredictResult(req.params.id);
    if (!deletedResult) {
        return sendError(res, 'Predict result not found', 404);
    }
    sendSuccess(res, { message: 'Predict result deleted successfully' }, 200);
}));

module.exports = router;
