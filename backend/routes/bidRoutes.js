import express from "express";
import {
  placeBid,
  getBidsForGig,
  hireBid,
  getMyBids,           // add this
} from "../controllers/bidController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my", auth, getMyBids);   
router.post("/", auth, placeBid);
router.get("/:gigId", auth, getBidsForGig);
router.patch("/:bidId/hire", auth, hireBid);

export default router;
