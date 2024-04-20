const { cornMoistPool } = require('../../config/dbConfig'); // Adjust the path as necessary

// A utility function to execute database queries with error handling
async function executeQuery(query, params = []) {
  try {
      const { rows } = await cornMoistPool.query(query, params);
      return { success: true, data: rows };
  } catch (error) {
      console.error('Error executing query:', error);
      return { success: false, error };
  }
}

async function createCornMoist(data) {
    const {
        sensor_id, inslot, batch, plant, vendor,
        moist_top_n, moist_top_min, moist_top_max, moist_top_avg, moist_top_mvavg, moist_top_sd,
        moist_bot_n, moist_bot_min, moist_bot_max, moist_bot_avg, moist_bot_mvavg, moist_bot_sd,
        moiscorn
    } = data;
    const query = `
        INSERT INTO corns_moist.corns_moist_result (
            sensor_id, inslot, batch, plant, vendor,
            moist_top_n, moist_top_min, moist_top_max, moist_top_avg, moist_top_mvavg, moist_top_sd,
            moist_bot_n, moist_bot_min, moist_bot_max, moist_bot_avg, moist_bot_mvavg, moist_bot_sd,
            moiscorn
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *;
    `;
    const values = [
        sensor_id, inslot, batch, plant, vendor,
        moist_top_n, moist_top_min, moist_top_max, moist_top_avg, moist_top_mvavg, moist_top_sd,
        moist_bot_n, moist_bot_min, moist_bot_max, moist_bot_avg, moist_bot_mvavg, moist_bot_sd,
        moiscorn
    ];
    // Make sure to await the response from executeQuery
    const response = await executeQuery(query, values); // This should be 'response', not 'result'
    // Now 'response' should have the structure { success: true, data: rows }
    if (response.success && response.data.length > 0) {
        return response.data[0]; // Accessing the first row of the returned data
    } else {
        // Handle the case where 'data' might be empty or 'success' is false
        throw new Error(response.error || 'Failed to create the corn moisture record.');
    }
}

async function fetchAllCornMoist() {
    const query = 'SELECT * FROM corns_moist.corns_moist_result';
    const { rows } = await executeQuery (query);
    return rows;
}

async function fetchCornMoistById(id) {
    const query = 'SELECT * FROM corns_moist.corns_moist_result WHERE id = $1';
    const { rows } = await executeQuery (query, [id]);
    return rows[0];
}

async function updateCornMoist(id, data) {
  const {
      sensor_id, inslot, batch, plant, vendor,
      moist_top_n, moist_top_min, moist_top_max, moist_top_avg, moist_top_mvavg, moist_top_sd,
      moist_bot_n, moist_bot_min, moist_bot_max, moist_bot_avg, moist_bot_mvavg, moist_bot_sd,
      moiscorn
  } = data;
  const query = `
      UPDATE corns_moist.corns_moist_result
      SET sensor_id = $2, inslot = $3, batch = $4, plant = $5, vendor = $6,
          moist_top_n = $7, moist_top_min = $8, moist_top_max = $9, moist_top_avg = $10, moist_top_mvavg = $11, moist_top_sd = $12,
          moist_bot_n = $13, moist_bot_min = $14, moist_bot_max = $15, moist_bot_avg = $16, moist_bot_mvavg = $17, moist_bot_sd = $18,
          moiscorn = $19, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
  `;
  const values = [
      id, sensor_id, inslot, batch, plant, vendor,
      moist_top_n, moist_top_min, moist_top_max, moist_top_avg, moist_top_mvavg, moist_top_sd,
      moist_bot_n, moist_bot_min, moist_bot_max, moist_bot_avg, moist_bot_mvavg, moist_bot_sd,
      moiscorn
  ];
  const { rows } = await executeQuery (query, values);
  return rows[0];
}

async function deleteCornMoist(id) {
  const query = 'DELETE FROM corns_moist.corns_moist_result WHERE id = $1 RETURNING *';
  const { rows } = await executeQuery (query, [id]);
  return rows[0]; // Return the deleted record
}

module.exports = {
    createCornMoist,
    fetchAllCornMoist,
    fetchCornMoistById,
    updateCornMoist,
    deleteCornMoist,
};

