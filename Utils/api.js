const BASE_API_URL = "https://1159-2804-14c-26-833e-5dcf-951e-392f-3ee2.sa.ngrok.io";

export function callApi({
    path = '',
    method,
    body
} = {
    path: '',
    method: "GET",
    body: null
}) {
    return fetch(`${BASE_API_URL}/${path}`, {
        method,
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            "ngrok-skip-browser-warning": "true",
        }),
        ...(body !== null ? {
            body: JSON.stringify(body)
        } : {})
    }).then(response => response.json());
}

export function callApiPessoas({
    path = '',
    method,
    body
} = {
    path: '',
    method: "GET",
    body: null
}) {
    return callApi({path: `pessoas${path}`, method, body});
}