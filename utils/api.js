const BASE_API_URL =
  "https://b71d-2003-cd-ef1c-c400-aeec-4a0c-947b-fba2.eu.ngrok.io";

export function callApi(
  { path = "", method, body } = {
    path: "",
    method: "GET",
    body: null,
  }
) {
  return fetch(`${BASE_API_URL}/${path}`, {
    method,
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      "ngrok-skip-browser-warning": "true",
    }),
    ...(body !== null
      ? {
          body: JSON.stringify(body),
        }
      : {}),
  }).then((response) => response.json());
}

export function callApiPessoas(
  { path = "", method, body } = {
    path: "",
    method: "GET",
    body: null,
  }
) {
  return callApi({ path: `pessoas${path}`, method, body });
}
