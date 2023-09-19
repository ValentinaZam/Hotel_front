import React, { useEffect, useState } from "react"
import "./App.css"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Main from "../Main/Main"
import NotFound from "../NotFound/NotFound"
import Register from "../Register/Register"
import Login from "../Login/Login"
import * as auth from "../../utils/Auth"
import { CurrentUserContext } from "../Context/CurrentUserContext"
import { mainApi } from "../../utils/MainApi"
import RoomInfo from "../RoomInfo/RoomInfo"



function App() {
  const navigate = useNavigate()
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({})
  const [errorGlobal, setErrorGlobal] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const [roomsAll, setRoomsAll] = useState([]);

  function resetErrorGlobal() {
    setErrorGlobal("");
  }


  const handleLoginSubmit = (userInfo) => {
    auth
      .authorize(userInfo)
      .then(() => {
        setLoggedIn(true)
        navigate("/", { replace: true })
      })
      .catch((err) => {
        setErrorGlobal(err.message)
      })
  }

  const handleRegistrationSubmit = (data) => {
    auth
      .register(data)
      .then((info) => {
        handleLoginSubmit({ email: data.email, password: data.password })
        setCurrentUser(info)
      })
      .catch((err) => {
        setErrorGlobal(err.message)
      })
  }



  useEffect(() => {
    const tokenUser = localStorage.getItem("token")
    if (tokenUser) {
      auth
        .checkToken(tokenUser)
        .then(() => {
          setLoggedIn(true)
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    }
  }, [loggedIn, errorGlobal])


  useEffect(() => {
    mainApi
      .getRooms()
      .then((rooms) => {
        localStorage.setItem("allRooms", JSON.stringify(rooms));
        setRoomsAll(rooms)
        console.log(rooms)
      }).catch((err) => console.log(`Ошибка: ${err}`))

  }, [setRoomsAll])

  const signOut = () => {
    setLoggedIn(false)
    localStorage.clear();
    navigate("/")
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Main signOut={signOut} loggedIn={loggedIn} roomsAll={roomsAll} />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/signup" element={<Register onSubmit={handleRegistrationSubmit} resetErrorGlobal={resetErrorGlobal} errorGlobal={errorGlobal} />} />
            <Route path="/signin" element={<Login onSubmit={handleLoginSubmit} resetErrorGlobal={resetErrorGlobal} errorGlobal={errorGlobal} />} />
            <Route path="/rooms/:id" element={<RoomInfo roomsAll={roomsAll} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;


// https://www.techinsider.ru/popmem/1553567-raznocvetnaya-sistema-pochemu-vse-planety-raznogo-cveta/