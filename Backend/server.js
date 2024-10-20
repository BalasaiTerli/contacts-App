const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authController = require("./controllers/authController");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.post("/signup", authController.signup);
app.post("/login", authController.login);
app.post("/api/contacts/add", authController.addContact);
app.get("/api/contacts/contactsList", authController.getContactList);
app.put("/api/contacts/edit/:id", authController.editContact);
app.delete("/api/contacts/delete/:id", authController.deleteContact);
