import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import User from "../models/User.js";
import { io } from "../server.js";


// PLACE BID
export const placeBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== "open")
      return res.status(400).json({ message: "Bidding closed for this gig" });

    const alreadyBid = await Bid.findOne({ gigId, freelancerId: req.user.id });
    if (alreadyBid)
      return res.status(400).json({ message: "You already bid on this gig" });

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { roles: "freelancer" },
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: "Bid failed", error: error.message });
  }
};

// GET BIDS FOR GIG (OWNER ONLY)
export const getBidsForGig = async (req, res) => {
  const gig = await Gig.findById(req.params.gigId);
  if (!gig) return res.status(404).json({ message: "Gig not found" });
  if (!gig.ownerId.equals(req.user.id))
    return res.status(403).json({ message: "Unauthorized" });

  const bids = await Bid.find({ gigId: gig._id }).populate("freelancerId", "name email");
  res.status(200).json(bids);
};

export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user.id })
      .populate("gigId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: "Failed to load your bids" });
  }
};




// HIRE FREELANCER
export const hireBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Authorization
    if (!gig.ownerId.equals(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (gig.status === "assigned") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // 1️⃣ Reject all bids
    await Bid.updateMany(
      { gigId: gig._id },
      { status: "rejected" }
    );

    // 2️⃣ Hire selected bid
    await Bid.findByIdAndUpdate(
      bid._id,
      { status: "hired" }
    );

    // 3️⃣ Mark gig as assigned
    await Gig.findByIdAndUpdate(
      gig._id,
      { status: "assigned" }
    );

    // 4️⃣ REAL-TIME NOTIFICATION
    io.to(bid.freelancerId.toString()).emit("hired", {
      message: `You have been hired for "${gig.title}"!`,
      gigId: gig._id,
    });

    return res.status(200).json({
      message: "Freelancer hired successfully",
    });

  } catch (error) {
    console.error("Hire error:", error);
    return res.status(500).json({ message: "Hiring failed" });
  }
};