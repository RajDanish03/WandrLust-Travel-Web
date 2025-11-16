const mongoose = require("mongoose");
const Reviews = require("./review");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wandarLust");
}
let Schema = mongoose.Schema;

const listingShema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    filename: String,
    url: String,
  },

  price: Number,
  location: String,
  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: String,
    enum: [
      "trandings",
      "Rooms",
      "Beach",
      "Mountain_City",
      "Amezing Pools",
      "Castle",
      "Camping",
      "Farms",
      "Arctic",
    ],
  },
});

listingShema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Reviews.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingShema);
module.exports = Listing;
