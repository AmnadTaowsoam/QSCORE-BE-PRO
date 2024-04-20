// models/qscore/qscoresResultModel.js

const { qscorePool } = require('../../config/dbConfig');

async function fetchAllQscoresResults() {
    const query = 'SELECT * FROM qscore.qscores_result';
    const { rows } = await qscorePool.query(query);
    return rows;
}

async function fetchQscoresResultById(id) {
    const query = 'SELECT * FROM qscore.qscores_result WHERE id = $1';
    const { rows } = await qscorePool.query(query, [id]);
    return rows[0];
}

async function createQscoresResult({ instlot, batch, plant, vendor, material, evaluate, sampling }) {
    const query = `
        INSERT INTO qscore.qscores_result (instlot, batch, plant, vendor, material, evaluate, sampling)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [instlot, batch, plant, vendor, material, evaluate, sampling];
    const { rows } = await qscorePool.query(query, values);
    return rows[0];
}

async function updateQscoresResult(id, { instlot, batch, plant, vendor, material, evaluate, sampling }) {
    const query = `
        UPDATE qscore.qscores_result
        SET instlot = $2, batch = $3, plant = $4, vendor = $5, material = $6, evaluate = $7, sampling = $8
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id, instlot, batch, plant, vendor, material, evaluate, sampling];
    const { rows } = await qscorePool.query(query, values);
    return rows[0];
}

async function deleteQscoresResult(id) {
    const query = 'DELETE FROM qscore.qscores_result WHERE id = $1 RETURNING *';
    const { rows } = await qscorePool.query(query, [id]);
    return rows[0];
}

module.exports = {
    fetchAllQscoresResults,
    fetchQscoresResultById,
    createQscoresResult,
    updateQscoresResult,
    deleteQscoresResult,
};
