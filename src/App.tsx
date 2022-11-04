import "./App.css";
//router import
import { BrowserRouter, Route, Routes } from "react-router-dom";
//component import
import SignupPage from "./components/authPage/SignupPage";
import LoginPage from "./components/authPage/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/dashboard/:accountUserName" element={<Dashboard />} />
          <Route path="/dashboard/guest" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
