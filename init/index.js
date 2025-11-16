const mongoose = require("mongoose");
const listing = require("../Model/listing.js");
const initData = require("./data.js");

// DATABASE CONNECTING HERE

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wandarLust");
}
main()
  .then((result) => {
    console.log("connection succsesfull");
  })
  .catch((err) => {
    console.log("some error in db");
  });

let initDb = async () => {
 await listing.deleteMany({});
//  initData.data=initData.data.map((obj)=>({...obj,owner:"6860dd26d9673556c3784979"}))
  await listing.insertMany(initData.data);
  console.log("data was initalize");
};

initDb();
