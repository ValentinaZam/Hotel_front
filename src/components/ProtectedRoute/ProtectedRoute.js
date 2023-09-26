import React from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ element: Component, ...props }) => {
    alert("Необходима авторизация")
    return props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />
}