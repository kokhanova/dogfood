const onResponce = (res) => {
    console.log(res);
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers,
        }).then(onResponce);
    }

    getUserInfo() {
        console.log(123);
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(onResponce);
    }

    setUserInfo(dataUser) {
        console.log(123);
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(dataUser),
        }).then(onResponce);
    }

    search(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers,
        }).then(onResponce);
    }

    changeLikeProduct(productId, isLike) {
        console.log(this._headers);
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers,
        }).then(onResponce);
    }
}

const config = {
    baseUrl: "https://api.react-learning.ru",
    headers: {
        "content-type": "application/json",
        Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzljZmUiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDcsImV4cCI6MTY5OTQ0Nzk0N30.Yc2RrvYKxrcpn50kJbuPaqfixly80tsLmN_fnCzCdjs",
    },
};

const api = new Api(config);

export default api;
