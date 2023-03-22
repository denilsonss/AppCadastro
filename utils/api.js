const BASE_API_URL =
  "https://f446-2804-14c-26-833e-90f2-4baa-a27-3f22.sa.ngrok.io";

export function callApi(
  { path = "", method, body } = {
    path: "",
    method: "GET",
    body: null,
  }
) {
  console.log(`${BASE_API_URL}/${path}`);
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
