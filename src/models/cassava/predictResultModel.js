const { cassavaPool } = require('../../config/dbConfig');

// A utility function to execute database queries with error handling
async function executeQuery(query, params = []) {
    console.log('Executing query:', query, 'Params:', params);
    try {
        const { rows } = await cassavaPool.query(query, params);
        console.log('Query result:', rows);
        return { success: true, data: rows };
    } catch (error) {
        console.error('Error executing query:', error);
        return { success: false, error };
    }
}

async function fetchAllPredictResults() {
    const query = 'SELECT * FROM cassava.predict_result';
    return await executeQuery(query);
}

async function fetchPredictResultById(id) {
    const query = 'SELECT * FROM cassava.predict_result WHERE id = $1';
    return await executeQuery(query, [id]);
}

async function createPredictResult(data) {
    const { inslot, batch, months, season, plant, vendor, region, fines, bulk, sand_predict_value, total_sand_value} = data;
    const query = `
        INSERT INTO cassava.predict_result (inslot, batch, months, season, plant, vendor, region, fines, bulk, sand_predict_value, total_sand_value)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
    `;
    const values = [inslot, batch, months, season, plant, vendor, region, fines, bulk, sand_predict_value, total_sand_value];
    return await executeQuery(query, values);
}

async function updatePredictResult(id, data) {
    const { inslot, batch, months, season, plant, vendor, region, fines, bulk, sand_predict_value, total_sand_value} = data;
    const query = `
        UPDATE cassava.predict_result
        SET inslot = $2, batch = $3, months = $4, season = $5, plant = $6, vendor = $7, region = $8, fines = $9, bulk = $10, sand_predict_value = $11,
            total_sand_value = $12
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id, inslot, batch, months, season, plant, vendor, region, fines, bulk, sand_predict_value, total_sand_value];
    return await executeQuery(query, values);
}

async function deletePredictResult(id) {
    const query = 'DELETE FROM cassava.predict_result WHERE id = $1 RETURNING *';
    return await executeQuery(query, [id]);
}

module.exports = {
    fetchAllPredictResults,
    fetchPredictResultById,
    createPredictResult,
    updatePredictResult,
    deletePredictResult,
};
