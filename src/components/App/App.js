import React from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Main from "../Main/Main"
import NotFound from "../NotFound/NotFound"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Header from "../Header/Header"
// import Profile from "../Profile/Profile"


function App() {

  return (
    <div className="body">
      <div className="page">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
