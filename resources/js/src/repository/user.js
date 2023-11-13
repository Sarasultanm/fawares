import Constants from "../utilities/constants";

const getProfile = () =>
    new Promise((resolve, reject) => {
        var url = `${Constants.baseUrl}/api/user`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({
                        message:
                            "Request failed with status: " + response.status,
                    });
                }
            })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                console.error(error);
                reject({
                    message: "An error occurred.",
                });
            });
    });

const signOut = () =>
    new Promise((resolve, reject) => {
        var url = `${Constants.baseUrl}/api/auth/sign-out`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({
                        message:
                            "Request failed with status: " + response.status,
                    });
                }
            })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                console.error(error);
                reject({
                    message: "An error occurred.",
                });
            });
    });

const signUp = (payload) =>
    new Promise((resolve, reject) => {
        let CSRF_token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        var url = `${Constants.baseUrl}/api/auth/register`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": CSRF_token,
            },
            body: JSON.stringify(payload),
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({
                        message:
                            "Request failed with status: " + response.status,
                    });
                }
            })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                console.error(error);
                reject({
                    message: "An error occurred.",
                });
            });
    });

const login = (payload) =>
    new Promise((resolve, reject) => {
        let CSRF_token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        var url = `${Constants.baseUrl}/api/auth/login`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": CSRF_token,
            },
            body: JSON.stringify(payload),
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({
                        message:
                            "Request failed with status: " + response.status,
                    });
                }
            })
            .then(function (response) {
                localStorage.setItem("token", response?.user?.token);
                resolve(response);
            })
            .catch(function (error) {
                console.error(error);
                reject({
                    message: "An error occurred.",
                });
            });
    });

const verifyGoogleAuth = (googleData) =>
    new Promise((resolve, reject) => {
        let CSRF_token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        var url = `${Constants.baseUrl}/api/auth/verify`;
        var data = {
            idToken: googleData.credential,
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": CSRF_token,
            },
            body: JSON.stringify(data),
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({
                        message:
                            "Request failed with status: " + response.status,
                    });
                }
            })
            .then(function (response) {
                localStorage.setItem("token", response?.user?.token);
                resolve(response);
            })
            .catch(function (error) {
                console.error(error);
                reject({
                    message: "An error occurred.",
                });
            });
    });

export { verifyGoogleAuth, getProfile, signOut, signUp, login };
