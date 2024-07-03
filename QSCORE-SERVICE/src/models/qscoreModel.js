const { qscorePool } = require('../config/dbconfig');

const getQscores = async () => {
    try {
        const result = await qscorePool.query('SELECT * FROM qscore.qscores');
        return result.rows;
    } catch (error) {
        console.error('Error executing getQscores query:', error.message, error.stack);
        throw error;
    }
};

const getQscoreById = async (id) => {
    try {
        const result = await qscorePool.query('SELECT * FROM qscore.qscores WHERE qscore_id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing getQscoreById query:', error.message, error.stack);
        throw error;
    }
};

const createQscore = async (qscore) => {
    const { vendor, material, qscoreValue, evaluate, accuracy_delivery, sampling } = qscore;
    try {
        const result = await qscorePool.query(
            `INSERT INTO qscore.qscores (vendor, material, qscore, evaluate, accuracy_delivery, sampling)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [vendor, material, qscoreValue, evaluate, accuracy_delivery, sampling]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error executing createQscore query:', error.message, error.stack);
        throw error;
    }
};

const updateQscore = async (id, qscore) => {
    const { vendor, material, qscoreValue, evaluate, accuracy_delivery, sampling } = qscore;
    try {
        const result = await qscorePool.query(
            `UPDATE qscore.qscores
             SET vendor = $1, material = $2, qscore = $3, evaluate = $4, accuracy_delivery = $5, sampling = $6, updated_at = CURRENT_TIMESTAMP
             WHERE qscore_id = $7 RETURNING *`,
            [vendor, material, qscoreValue, evaluate, accuracy_delivery, sampling, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error executing updateQscore query:', error.message, error.stack);
        throw error;
    }
};

const deleteQscore = async (id) => {
    try {
        await qscorePool.query('DELETE FROM qscore.qscores WHERE qscore_id = $1', [id]);
    } catch (error) {
        console.error('Error executing deleteQscore query:', error.message, error.stack);
        throw error;
    }
};

const getQscoreByVendorAndMaterial = async (vendor, material) => {
    try {
        const result = await qscorePool.query(
            'SELECT * FROM qscore.qscores  WHERE vendor = $1 AND material = $2',
            [vendor, material]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error querying qscore by vendor and material:', error.message, error.stack);
        throw error;
    }
};

module.exports = {
    getQscores,
    getQscoreById,
    createQscore,
    updateQscore,
    deleteQscore,
    getQscoreByVendorAndMaterial
};
