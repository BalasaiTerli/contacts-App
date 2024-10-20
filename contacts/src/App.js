import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import AddContactForm from "./components/addContactForm";
import ContactList from "./components/ContactList";
import EditContact from "./components/editContact";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route
        path="/home"
        element={<PrivateRoute element={<AddContactForm />} />}
      />
      <Route
        path="/contacts"
        element={<PrivateRoute element={<ContactList />} />}
      />
      <Route
        path="/edit/:id"
        element={<PrivateRoute element={<EditContact />} />}
      />
    </Routes>
  );
};

export default App;
