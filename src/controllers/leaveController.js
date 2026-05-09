const pool = require("../config/db");

// CREATE LEAVE REQUEST
const createLeaveRequest = async (req, res) => {
  try {
    const { leave_type, start_date, end_date, reason } = req.body;

    // Validate
    if (!leave_type || !start_date || !end_date) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Create request
    const newRequest = await pool.query(
      `
      INSERT INTO leave_requests
      (user_id, leave_type, start_date, end_date, reason)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [req.user.id, leave_type, start_date, end_date, reason],
    );

    res.status(201).json({
      message: "Leave request submitted",
      leave: newRequest.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET MY LEAVE REQUESTS
const getMyLeaveRequests = async (req, res) => {
  try {
    const requests = await pool.query(
      `
      SELECT *
      FROM leave_requests
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id],
    );

    res.json(requests.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ADMIN GET ALL REQUESTS
const getAllLeaveRequests = async (req, res) => {
  try {
    const requests = await pool.query(
      `
      SELECT
        leave_requests.*,
        users.name,
        users.email
      FROM leave_requests
      JOIN users
      ON leave_requests.user_id = users.id
      ORDER BY leave_requests.created_at DESC
      `,
    );

    res.json(requests.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ADMIN UPDATE STATUS
const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    // Validate status
    const validStatuses = ["approved", "rejected", "pending"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // Check existing request
    const existingRequest = await pool.query(
      `
      SELECT *
      FROM leave_requests
      WHERE id = $1
      `,
      [id],
    );

    if (existingRequest.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const currentRequest = existingRequest.rows[0];

    // Prevent updating finalized requests
    if (
      currentRequest.status === "approved" ||
      currentRequest.status === "rejected"
    ) {
      return res.status(400).json({
        message: "This leave request has already been finalized",
      });
    }

    // Update
    const updatedRequest = await pool.query(
      `
      UPDATE leave_requests
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id],
    );

    if (updatedRequest.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    res.json({
      message: "Leave request updated",
      leave: updatedRequest.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createLeaveRequest,
  getMyLeaveRequests,
  getAllLeaveRequests,
  updateLeaveStatus,
};
