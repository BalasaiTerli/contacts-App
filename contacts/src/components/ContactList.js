import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; 

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate(); 

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/contacts/contactsList"
      );
      setContacts(response.data);
    } catch (error) {
      console.error(
        "Error fetching contacts:",
        error?.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/delete/${id}`);
      alert("Contact deleted successfully!");
      fetchContacts();
    } catch (error) {
      console.error(
        "Error deleting contact:",
        error?.response?.data || error.message
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {" "}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl overflow-x-auto">
        {" "}
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Contact List
        </h2>
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Address
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                  {contact.firstName}
                </td>
                <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                  {contact.lastName}
                </td>
                <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                  {contact.phoneNumber}
                </td>
                <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                  {contact.email}
                </td>
                <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                  {contact.address}
                </td>
                <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                  <div className="flex space-x-2 justify-center">
                    {" "}
                    <button
                      onClick={() => handleEdit(contact._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
