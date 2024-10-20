const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ContactInfo = require("../models/ContactInfo");

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

   
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




const login = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const addContact = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, address } = req.body;

  try {
    const newContact = new ContactInfo({
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
    });
    await newContact.save();
    res
      .status(201)
      .json({ message: "Contact added successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: "Error adding contact", error });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await ContactInfo.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

const getContactList = async (req, res) => {
  try {
    const contacts = await ContactInfo.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

const editContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;

  try {
    const contact = await ContactInfo.findByIdAndUpdate(id, updatedContact, {
      new: true,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
};

module.exports = {
  signup,
  login,
  addContact,
  deleteContact,
  getContactList,
  editContact,
};
