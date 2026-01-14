import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
 
 
  gigId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Gig', 
    required: [true, 'Bid must belong to a gig']
  },


  freelancerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Bid must have an author']
  },



  message: { 
    type: String, 
    required: [true, 'Please provide a message with your bid'],
    trim: true
  },
 
  price: {
      type: Number,
      required: true,
    },

  status: { 
    type: String, 
    required: true,
    enum: {
      values: ['pending', 'hired', 'rejected'],
      message: '{VALUE} is not a valid bid status'
    },
    default: 'pending' 
  }

}, { 
  timestamps: true 
});


const Bid = mongoose.model('Bid', bidSchema);
export default Bid;