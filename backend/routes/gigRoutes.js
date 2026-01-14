import express from "express";
import { createGig, getGigs, getGigById } from "../controllers/gigController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getGigs);
router.get("/:id", getGigById);
router.post("/", auth, createGig);

export default router;

