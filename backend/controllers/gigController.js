import Gig from "../models/Gig.js";
import User from "../models/User.js";

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { roles: "client" },
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: "Gig creation failed", error: error.message });
  }
};


export const getGigs = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query).populate("ownerId", "name");

    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gigs", error });
  }
};



export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate("ownerId", "name email");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.status(200).json(gig);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gig",
      error: error.message,
    });
  }
};

