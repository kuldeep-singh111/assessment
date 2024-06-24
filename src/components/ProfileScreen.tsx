import React from 'react';
import './ProfileScreen.css';
import { Link } from 'react-router-dom';
import { FaTentArrowTurnLeft } from "react-icons/fa6";

interface Address {
  street: string;
  city: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
}

const users: User[] = [
  {
    id: 12345687,
    name: "Ervin Howell",
    email: "ervinhowell@gmail.com",
    address: {
      street: "india, bangalore, AT144",
      city: ""
    },
    phone: "9606812345"
  },
];

const UserList: React.FC = () => {
  return (
    <>
  <Link to="/" className="navigate"><FaTentArrowTurnLeft /> Welcome, Ervin Howell</Link>
    <div className="main-container">
  
      <div className="container">
        <div className="user-profile">
          <span className="profile-initials">EH</span>
          <div className="user-details">
            <span className="user-name">Ervin Howell</span>
            <span className="user-email">ervinhowell@gmail.com</span>
          </div>
        </div>
        {users.map((item: User) => (
          <div key={item.id} className="user-data">
            <div className="user-info">
              <label className="info-label">User ID</label>
              <p className="info-value">{item.id}</p>
            </div>
            <div className="user-info">
              <label className="info-label">Name</label>
              <p className="info-value">{item.name}</p>
            </div>
            <div className="user-info">
              <label className="info-label">Email ID</label>
              <p className="info-value">{item.email}</p>
            </div>
            <div className="user-info">
              <label className="info-label">Address</label>
              <p className="info-value">{item.address.street}</p>
            </div>
            <div className="user-info">
              <label className="info-label">Phone</label>
              <p className="info-value">{item.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default UserList;
