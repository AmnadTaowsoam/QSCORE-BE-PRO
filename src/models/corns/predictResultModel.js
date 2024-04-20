const { cornPool } = require('../../config/dbConfig');

// Utility function to execute database queries with error handling
async function executeQuery(query, params = []) {
    try {
        const { rows } = await cornPool.query(query, params);
        return { success: true, data: rows };
    } catch (error) {
        console.error('Error executing query:', error);
        return { success: false, error: error.message };
    }
}

async function fetchAllPredictRecords() {
    const query = 'SELECT * FROM corns.prediction_record';
    return await executeQuery(query);
}

async function fetchPredictRecordById(id) {
    const query = 'SELECT * FROM corns.prediction_record WHERE id = $1';
    return await executeQuery(query, [id]);
}

async function createPredictRecord(data) {
    const fields = ['inslot', 'batch', 'plant', 'vendor', 'operation', 'sample_weight', 'count_by_class', 'weight_by_class'];
    const query = `
        INSERT INTO corns.prediction_record (${fields.join(', ')})
        VALUES (${fields.map((_, index) => `$${index + 1}`).join(', ')})
        RETURNING *;
    `;
    const values = fields.map(field => data[field]);
    return await executeQuery(query, values);
}

async function updatePredictRecord(id, data) {
    const updates = Object.keys(data).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const query = `
        UPDATE corns.prediction_record
        SET ${updates}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id, ...Object.values(data)];
    return await executeQuery(query, values);
}

async function deletePredictRecord(id) {
    const query = 'DELETE FROM corns.prediction_record WHERE id = $1 RETURNING *';
    return await executeQuery(query, [id]);
}

module.exports = {
    fetchAllPredictRecords,
    fetchPredictRecordById,
    createPredictRecord,
    updatePredictRecord,
    deletePredictRecord,
};
