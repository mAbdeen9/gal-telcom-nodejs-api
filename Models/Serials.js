const mongoose = require('mongoose');

const SerialSchema = mongoose.Schema({
  serials: String,
  order: [
    {
      name: { type: String },
      value: { type: String },
      type: { type: String },
    },
  ],
  id: String,
  date: String,
  user: String,
  createdAt: { type: Date, default: Date.now },
});

const Serial = mongoose.model('Serials', SerialSchema);
module.exports = Serial;
