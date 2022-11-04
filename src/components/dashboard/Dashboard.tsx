import { getAuth } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

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
    <>
      <Navbar />
      <div className="mt-[100px]">
        <div className="max-w-[1366px] bg-[gray] m-[auto]">
          {user !== null ? (
            <>
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

              <br />
              <br />
              <button onClick={logOut}>Log out</button>
            </>
          ) : (
            <div>
              <Link to="/">Please Log In</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
