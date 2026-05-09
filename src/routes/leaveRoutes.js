const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createLeaveRequest,
  getMyLeaveRequests,
  getAllLeaveRequests,
  updateLeaveStatus,
} = require("../controllers/leaveController");

/**
 * @swagger
 * /api/leaves:
 *   post:
 *     summary: Create leave request
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leave_type
 *               - start_date
 *               - end_date
 *             properties:
 *               leave_type:
 *                 type: string
 *                 example: Annual
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-15
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-20
 *               reason:
 *                 type: string
 *                 example: Family trip
 *     responses:
 *       201:
 *         description: Leave request submitted successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, createLeaveRequest);

/**
 * @swagger
 * /api/leaves/my:
 *   get:
 *     summary: Get current user's leave requests
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's leave requests
 *       401:
 *         description: Unauthorized
 */
router.get("/my", authMiddleware, getMyLeaveRequests);

/**
 * @swagger
 * /api/leaves:
 *   get:
 *     summary: Admin gets all leave requests
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all leave requests
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 */
router.get("/", authMiddleware, adminMiddleware, getAllLeaveRequests);

/**
 * @swagger
 * /api/leaves/{id}:
 *   put:
 *     summary: Update leave request status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Leave request ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - approved
 *                   - rejected
 *                   - pending
 *                 example: approved
 *     responses:
 *       200:
 *         description: Leave request updated successfully
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Leave request not found
 */
router.put("/:id", authMiddleware, adminMiddleware, updateLeaveStatus);

module.exports = router;
