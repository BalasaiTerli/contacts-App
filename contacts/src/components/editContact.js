import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contacts/${id}`
        );
        setContact(response.data);
      } catch (error) {
        console.error(
          "Error fetching contact:",
          error?.response?.data || error.message
        );
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/contacts/edit/${id}`, contact);
      alert("Contact updated successfully!");
      navigate("/contacts");
    } catch (error) {
      console.error(
        "Error updating contact:",
        error?.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Edit Contact
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400">First Name</label>
            <input
              type="text"
              name="firstName"
              value={contact.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={contact.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={contact.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="text"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Address</label>
            <input
              type="text"
              name="address"
              value={contact.address}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Update Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
