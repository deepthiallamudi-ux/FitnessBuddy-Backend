import express from "express"
import {
  createAchievement,
  getUserAchievements,
  getAllAchievements,
  getAchievementCounts,
  deleteAchievement
} from "../controllers/achievementsControllers.js"

const router = express.Router()

// Achievements routes
router.post("/", createAchievement) // Create achievement
router.get("/all", getAllAchievements) // Get all achievements (must be before /:achievementId)
router.get("/counts", getAchievementCounts) // Get achievement counts by type (must be before /:achievementId)
router.get("/user/:userId", getUserAchievements) // Get user's achievements (must be before /:achievementId)
router.delete("/:achievementId", deleteAchievement) // Delete achievement

export default router
