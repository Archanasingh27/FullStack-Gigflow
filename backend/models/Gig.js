
import mongoose from "mongoose"; 

const gigSchema = new mongoose.Schema({

  title: { 
    type: String, 
    required: true, 
    trim: true,
  },

  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },

  budget: { 
    type: Number, 
    required: true,
    min: [0, 'Budget cannot be negative'] 
  },
  
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },

  status: { 
    type: String, 
    required: true,
    enum: {
      values: ['open', 'assigned'],
      message: '{VALUE} is not a valid status'
    },
    default: 'open' 
  },



}, { 
  timestamps: true, 
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


const Gig = mongoose.model('Gig', gigSchema);
export default Gig;