import { getAuth } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();
  console.log(user);

  const logOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div>
      {user !== null ? (
        <div>
          <ul>
            {user.displayName === null ? (
              <div>
                <li>email:{user.email}</li>
              </div>
            ) : (
              <div>
                <li>DisplayName:{user.displayName}</li>
                <li>email:{user.email}</li>
              </div>
            )}

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

      <br />
      <br />
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Dashboard;
