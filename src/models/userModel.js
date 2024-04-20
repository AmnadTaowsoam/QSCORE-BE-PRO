const { usersPool } = require("../config/dbConfig");
const bcrypt = require("bcryptjs");

async function getUserByUsername(username) {
  console.log(`Fetching user from DB: ${username}`);
  const query = "SELECT * FROM users.users WHERE username = $1";
  const values = [username];
  try {
    const res = await usersPool.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw error;
  }
}

async function createUser({ username, password, email, roles }) {
  console.log(`Creating user: ${username}`);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const query =
    "INSERT INTO users.users (username, pwd, email, roles) VALUES ($1, $2, $3, $4) RETURNING *;";
  const values = [username, hashedPassword, email, roles]; // เพิ่ม role ที่นี่
  const res = await usersPool.query(query, values);
  return res.rows[0];
}

async function updateUser(username, newPassword) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const query =
    "UPDATE users.users SET pwd = $2 WHERE username = $1 RETURNING *";
  const values = [username, hashedPassword];
  const res = await usersPool.query(query, values);
  console.log("UserId =", res.rows[0]);
  return res.rows[0];
}

async function findUserByUsername(username) {
  const query = "SELECT * FROM users.users WHERE username = $1";
  const values = [username];
  try {
    const res = await usersPool.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw error;
  }
}

async function findUserById(userId) {
  const query = "SELECT * FROM users.users WHERE user_id = $1";
  const values = [userId];
  try {
    const res = await usersPool.query(query, values);
    return res.rows[0]; // Return the first row (user object) or undefined if not found
  } catch (error) {
    console.error("Error fetching user by ID from database:", error);
    throw error;
  }
}


async function deleteUser(userId) {
  const query = "DELETE FROM users.users WHERE user_id = $1 RETURNING *";
  const values = [userId];
  const res = await usersPool.query(query, values);
  if (res.rows.length === 0) {
    throw new Error("User not found");
  }
  return res.rows[0]; // Or just return res.rowCount for the number of rows affected
}

// In userModel.js
async function getAllUsersWithConfigurations() {
    const query = `
      SELECT u.*, mc.machine_id, mc.machine_ip, mc.port, mc.descriptions
      FROM users.users u
      LEFT JOIN users.machine_configurations mc ON u.user_id = mc.user_id;
    `;
    try {
      const { rows } = await usersPool.query(query);
      return rows.map(user => {
        // Optionally format the user object if needed, for example:
        return {
          ...user,
          machine_config: user.machine_id ? {
            machine_id: user.machine_id,
            machine_ip: user.machine_ip,
            port: user.port,
            descriptions: user.descriptions
          } : null
        };
      });
    } catch (error) {
      console.error("Error fetching users and configurations:", error);
      throw error;
    }
  }

module.exports = {
  getUserByUsername,
  getAllUsersWithConfigurations,
  findUserByUsername,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
