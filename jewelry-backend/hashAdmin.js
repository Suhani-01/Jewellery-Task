const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust path if needed

mongoose.connect("mongodb://127.0.0.1:27017/jewelry-db")
  .then(async () => {
    const hashed = await bcrypt.hash("adminPassword", 10);
    await User.updateOne(
      { email: "admin@example.com" },
      { $set: { password: hashed, role: "admin" } }
    );
    console.log("Admin password hashed and role set!");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
