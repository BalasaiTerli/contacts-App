import axios from "axios";

export const loginOrSignup = async (e, email, password, isLogin, navigate) => {
  e.preventDefault();
  const endpoint = isLogin ? "/login" : "/signup";

  // Check password length
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  try {
    const response = await axios.post(`http://localhost:5000${endpoint}`, {
      email,
      password,
    });
    alert("Success!");

    if (isLogin && response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    }
  } catch (error) {
    if (!isLogin && error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      if (errorMessage === "User already exists") {
        alert("Email is already registered. Please log in.");
      } else {
        alert("Failed to register. Please try again.");
      }
    } else {
      alert("Invalid credentials");
    }
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};


export const addContact = async (
  e,
  firstName,
  lastName,
  phoneNumber,
  email,
  address
) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/contacts/add", {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
    });
    alert("Contact added successfully!");
  } catch (error) {
    console.error("Error adding contact:", error);
    alert("Failed to add contact. Please try again.");
  }
};
