import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
    
import { Context } from "../store/appContext";

import "../../styles/demo.css"; 

export const Demo = () => {
	const { store, actions } = useContext(Context);
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault()
    const newContact = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };
    actions.createContact(newContact);
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
  }; 
                
	return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setFullName(e.target.value)}
          required // Validación HTML5
        />
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput2"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Validación HTML5
        />
        <label htmlFor="exampleFormControlInput3" className="form-label">
          Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput3"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required // Validación HTML5
        />
        <label htmlFor="exampleFormControlInput4" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput4"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required // Validación HTML5
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
    <Link to="/">
      <button className="btn btn-secondary">Back Home</button>
    </Link>
  </div>
		);
};
