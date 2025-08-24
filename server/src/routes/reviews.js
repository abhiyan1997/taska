import express from "express"
import { getReviews, submitReviews } from "../controllers/reviews.js"
const router= express.Router()

router.post('/submitreviews', submitReviews)
router.get('/getreviews/:id', getReviews)

export default router