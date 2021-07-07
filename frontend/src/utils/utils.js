export function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка ${res}`);
  } else {
    return res.json();
  }
}
