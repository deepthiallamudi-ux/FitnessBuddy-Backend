import express from "express"
import {
  getLeaderboard,
  getUserRank,
  getCohortLeaderboard
} from "../controllers/leaderboardControllers.js"

const router = express.Router()

// Leaderboard routes
router.get("/rank/:userId", getUserRank) // Get user's rank (must be before /:userId)
router.get("/cohort/:userId", getCohortLeaderboard) // Get cohort leaderboard (must be before /:userId)
router.get("/", getLeaderboard) // Get global leaderboard

export default router
