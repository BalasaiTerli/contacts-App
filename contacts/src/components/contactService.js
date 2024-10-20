import axios from "axios";

export const handleSubmit = async (e, firstName, lastName, phoneNumber) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/contacts/add", {
      firstName,
      lastName,
      phoneNumber,
    });
    alert("Contact added successfully!");
  } catch (error) {
    console.error("Error adding contact:", error);
    alert("Failed to add contact. Please try again.");
  }
};
