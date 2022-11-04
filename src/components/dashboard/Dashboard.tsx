import { getAuth } from "firebase/auth";
import Navbar from "../navbar/Navbar";

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user);

  return (
    <>
      <Navbar />
      <div className="mt-[100px]">
        <div className="max-w-[1366px] bg-[gray] m-[auto]">
          {user === null && <div>You're visiting as a Guest/Visitor</div>}
          {user !== null && (
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
