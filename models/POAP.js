const mongoose = require("mongoose");

const poapSchema = mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true
    },
    maxAmount: {
      type: Number,
      required: true
    },
    claimed: {
      type: Number,
      required: true
    },
    poapName: {
      type: String,
    },
    poapImage: {
      type: String
    },
    owners: [],
    codes: []
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("POAP", poapSchema);