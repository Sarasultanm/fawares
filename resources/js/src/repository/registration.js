import Constants from "../utilities/constants";

const ramakaRegistration = (payload) =>
    new Promise(async (resolve, reject) => {
        var url = `${Constants.baseUrl}/api/register`;
        let CSRF_token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        const formData = new FormData();
        Object.keys(payload).forEach(async (key) => {
            formData.append(key, payload[key]);
        });

        fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-CSRF-TOKEN": CSRF_token,
            },
            body: formData,
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

const ramakaRegistrationList = (query) =>
    new Promise(async (resolve, reject) => {
        const queryString = new URLSearchParams(query).toString();
        var url = `${Constants.baseUrl}/api/registration/list?${queryString}`;

        fetch(url, {
            method: "GET",
            headers: {
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

export { ramakaRegistration, ramakaRegistrationList };
