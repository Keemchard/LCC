import { getAuth } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div>
      {user !== null ? (
        <div>
          <ul>
            <li>DisplayName:{user.displayName}</li>
            <li>email:{user.email}</li>
            <li>uid:{user.uid}</li>
          </ul>
          {user.photoURL !== null ? (
            <img src={user.photoURL} alt="" />
          ) : (
            <div>No Image yet</div>
          )}
        </div>
      ) : (
        <div>
          <Link to="/">Please Log In</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
