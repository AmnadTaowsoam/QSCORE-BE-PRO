//src/models/machineConfigModel.js
const { usersPool } = require('../config/dbConfig');

async function createMachineConfiguration({ user_id, username, machine_id, machine_ip, port, descriptions }) {
    const query = 'INSERT INTO users.machine_configurations (user_id, username, machine_id, machine_ip, port, descriptions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
    const values = [user_id, username, machine_id, machine_ip, port, descriptions];
    try {
        const res = await usersPool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Error creating machine configuration:', error);
        throw error;
    }
}

async function getMachineConfiguration(machine_id) {
    const query = 'SELECT machine_ip, port FROM users.machine_configurations WHERE machine_id = $1';
    const values = [machine_id];
    try {
        const res = await usersPool.query(query, values);
        if (res.rows.length > 0) {
            return res.rows[0]; // คืนค่า row แรกที่ตรงกัน
        } else {
            return null; // ไม่พบการตั้งค่า
        }
    } catch (error) {
        console.error('Error fetching machine configuration:', error);
        throw error;
    }
}

async function updateMachineConfiguration(machine_id, newMachineIp, newPort, descriptions) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const query = 'UPDATE users.machine_configurations SET machine_ip = $2, port = $3, descriptions = $4 WHERE machine_id = $1 RETURNING *';
        const values = [machine_id, newMachineIp, newPort,descriptions];
        const res = await client.query(query, values);
        await client.query('COMMIT');
        return res.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction ROLLBACK', error);
        throw error;
    } finally {
        client.release();
    }
}

async function deleteMachineConfiguration(machine_id) {
    const query = 'DELETE FROM users.machine_configurations WHERE machine_id = $1 RETURNING *';
    const values = [machine_id];
    try {
        const res = await usersPool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Error deleting machine configuration:', error);
        throw error;
    }
}

async function findMachineIdByUserId(user_id) {
    const query = 'SELECT machine_id, machine_ip FROM users.machine_configurations WHERE user_id = $1';
    const values = [user_id];
    try {
        const res = await usersPool.query(query, values);
        if (res.rows.length > 0) {
            // Instead of returning just the machine_id, return an object with both machine_id and machine_ip
            return { 
                machine_id: res.rows[0].machine_id, 
                machine_ip: res.rows[0].machine_ip,
                port: res.rows[0].port 
            };
        } else {
            return null; // Return null if no machine configuration is found for the user
        }
    } catch (error) {
        console.error('Error finding machine configuration:', error);
        throw error;
    }
}

module.exports = {
    createMachineConfiguration,
    getMachineConfiguration,
    updateMachineConfiguration,
    deleteMachineConfiguration,
    findMachineIdByUserId
};

