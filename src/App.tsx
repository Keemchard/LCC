import "./App.css";
//component import
import SigninPage from "./components/authPage/SigninPage";
import LoginPage from "./components/authPage/LoginPage";
//router import
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-in" element={<SigninPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
