import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loadings/Loading";

const Navbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    console.log(user);
  }, [user]);

  const logOut = async () => {
    setLoading(true);
    await auth.signOut();
    setLoading(false);
    navigate("/");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[salmon] p-[20px] pl-[40px] pr-[40px] flex items-center fixed w-[100%] top-0">
      <div className="logo bg-[gray] flex-[1.3]">
        <p className="text-[30px]">LOGO</p>
      </div>
      <div className="menus bg-[yellow] flex-[1]">
        <ul className="flex justify-between">
          <li>HOME</li>
          <li>BLOG</li>
          <li>EVENTS</li>
          <li>GALLERY</li>
          <li>ANNOUNCEMENTS</li>
          {user === null ? (
            <li
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              SIGN UP
            </li>
          ) : (
            <li onClick={logOut}>LOG OUT</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
