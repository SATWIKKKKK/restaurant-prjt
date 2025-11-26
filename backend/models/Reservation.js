const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    required: [true, 'Please provide a reservation date']
  },
  time: {
    type: String,
    required: [true, 'Please provide a reservation time']
  },
  numberOfGuests: {
    type: Number,
    required: [true, 'Please provide number of guests'],
    min: 1,
    max: 20
  },
  tableNumber: {
    type: Number
  },
  specialRequests: String,
  occasion: {
    type: String,
    enum: ['birthday', 'anniversary', 'business', 'date', 'family', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  confirmationCode: {
    type: String,
    unique: true
  },
  cancelReason: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate confirmation code before saving
reservationSchema.pre('save', function(next) {
  if (!this.confirmationCode) {
    this.confirmationCode = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Reservation', reservationSchema);
