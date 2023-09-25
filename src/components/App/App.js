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
import { admin } from "../../utils/const"
import AdminPage from "../AdminPage/AdminPage"
import RoomsReservedUser from "../RoomsReservedUser/RoomsReservedUser"



function App() {
  const navigate = useNavigate()
  const location = useLocation();
  const [roomIdRes, setRoomIdRes] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")) ?? false)
  const [errorGlobal, setErrorGlobal] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const [roomsAll, setRoomsAll] = useState([]);
  const [myRoom, setMyRoom] = useState([])
  const [check, setCheck] = useState(null)

  function resetErrorGlobal() {
    setErrorGlobal("");
  }


  const handleLoginSubmit = (userInfo) => {
    auth
      .authorize(userInfo)
      .then(() => {
        if (userInfo.email === admin.email && userInfo.password === admin.password) {
          setIsAdmin(true)
          localStorage.setItem("isAdmin", true)
        } else {
          setIsAdmin(false)
          localStorage.setItem("isAdmin", false)
        }

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
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((infoUser) => setCurrentUser(infoUser))
        .catch((err) => console.log(`Ошибка ${err}`))
    }
  }, [loggedIn])

  useEffect(() => {
    const tokenUser = localStorage.getItem("token")
    if (tokenUser) {
      auth
        .checkToken(tokenUser)
        .then(() => {
          setLoggedIn(true)
          navigate(location.pathname, { replace: true });
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    }
  }, [loggedIn])


  useEffect(() => {
    mainApi
      .getRooms()
      .then((rooms) => {
        setRoomsAll(rooms)
        const test = rooms.filter(el => el.status === false)
        setMyRoom(test)
      }).catch((err) => console.log(`Ошибка: ${err}`))
  }
    , [loggedIn, location])

  const signOut = () => {
    setLoggedIn(false)
    localStorage.clear();
    navigate("/")
  }

  const onDelete = (id) => {
    const resRoom = myRoom.find((room) => room._id === id)
    resRoom.owner = "0"
    resRoom.status = true;
    mainApi
      .setRoomInfo(resRoom)
      .then((room) => {
        setCheck(room)
      })
      .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Main signOut={signOut} loggedIn={loggedIn} roomsAll={roomsAll} isAdmin={isAdmin} />} />
            <Route path="/signup" element={<Register onSubmit={handleRegistrationSubmit} resetErrorGlobal={resetErrorGlobal} errorGlobal={errorGlobal} />} />
            <Route path="/signin" element={<Login onSubmit={handleLoginSubmit} resetErrorGlobal={resetErrorGlobal} errorGlobal={errorGlobal} />} />
            <Route path="/rooms" element={<AdminPage roomsAll={roomsAll} loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} />} />
            <Route path="/rooms/:_id" element={<RoomInfo roomsAll={roomsAll} loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} setMyRoom={setMyRoom} myRoom={myRoom} setRoomsAll={setRoomsAll} setRoomIdRes={setRoomIdRes} currentUser={currentUser} />} />
            <Route path="/saved-rooms" element={<RoomsReservedUser check={check} myRoom={myRoom} loggedIn={loggedIn} signOut={signOut} isAdmin={isAdmin} onDelete={onDelete} roomIdRes={roomIdRes} currentUser={currentUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;


// https://www.techinsider.ru/popmem/1553567-raznocvetnaya-sistema-pochemu-vse-planety-raznogo-cveta/