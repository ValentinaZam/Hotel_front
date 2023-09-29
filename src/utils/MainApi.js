class MainApi {
    constructor({ url }) {
        this._url = url
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(this._url + "/users/me", {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            }
        }).then((res) => this._checkResponse(res))
    }

    setRoomInfo(data) {
        return fetch(this._url + `/rooms/${data._id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                status: data.status,
                owner: data.owner
            })
        }).then((res) => this._checkResponse(res))
    }

    addSaveRoom(data) {
        return fetch(this._url + `/rooms/${data._id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                owner: data.owner
            })
        }).then((res) => this._checkResponse(res))
    }

    getRooms() {
        return fetch(this._url + "/rooms", {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            }
        }).then((res) => this._checkResponse(res))
    }

    deleteMovie(movieId) {
        return fetch(this._url + "/movies/" + movieId, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            }
        }).then((res) => this._checkResponse(res))
    }
}

export const mainApi = new MainApi({
    url: "https://api.petprodject-hotelpanet.ru;",
    // url: "http://localhost:3000"
})
