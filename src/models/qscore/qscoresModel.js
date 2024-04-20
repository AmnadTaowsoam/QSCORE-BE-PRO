// models/qscore/qscoresModel.js

const { qscorePool } = require('../../config/dbConfig');

async function fetchAllQscores() {
    const query = 'SELECT * FROM qscore.qscores';
    const { rows } = await qscorePool.query(query);
    return rows;
}

async function fetchQscoreById(qscore_id) {
    const query = 'SELECT * FROM qscore.qscores WHERE qscore_id = $1';
    const { rows } = await qscorePool.query(query, [qscore_id]);
    return rows[0];
}

async function createQscore({ vendor, material, qscore, evaluate, accumary_delivery, sampling }) {
    const query = `
        INSERT INTO qscore.qscores (vendor, material, qscore, evaluate, accumary_delivery, sampling)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [vendor, material, qscore, evaluate, accumary_delivery, sampling];
    const { rows } = await qscorePool.query(query, values);
    return rows[0];
}

async function updateQscore(qscore_id, { vendor, material, qscore, evaluate, accumary_delivery, sampling }) {
    const query = `
        UPDATE qscore.qscores
        SET vendor = $2, material = $3, qscore = $4, evaluate = $5, accumary_delivery = $6, sampling = $7
        WHERE qscore_id = $1
        RETURNING *;
    `;
    const values = [qscore_id, vendor, material, qscore, evaluate, accumary_delivery, sampling];
    const { rows } = await qscorePool.query(query, values);
    return rows[0];
}

async function deleteQscore(qscore_id) {
    const query = 'DELETE FROM qscore.qscores WHERE qscore_id = $1 RETURNING *';
    const { rows } = await qscorePool.query(query, [qscore_id]);
    return rows[0];
}

async function searchByVendorAndMaterial(vendor, material) {
    try {
        const query = 'SELECT evaluate, sampling FROM qscore.qscores WHERE vendor = $1 AND material = $2';
        const { rows } = await qscorePool.query(query, [vendor, material]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error during the searchByVendorAndMaterial query:', error);
        throw error; // Rethrowing the error so it can be caught by the calling function
    }
}


module.exports = {
    searchByVendorAndMaterial,
    fetchAllQscores,
    fetchQscoreById,
    createQscore,
    updateQscore,
    deleteQscore,
};
