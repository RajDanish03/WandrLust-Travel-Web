const mongoose = require("mongoose");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wandarLust");
}
let Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author:
    {
      type:Schema.Types.ObjectId,
      ref:"user"
    }
});

const review = mongoose.model("review", reviewSchema);
module.exports = review;
