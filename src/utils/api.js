const apiEndpoints = {
  ingredients: '/ingredients',
  orders: '/orders',
}
export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}


const checkReponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
const checkSuccess = (data) => (data.success ? data : Promise.reject(data))

function request(url, options) {
  return fetch(url, options).then(checkReponse).then(checkSuccess)
}

export const getIngredients = async () =>
    await request(`${BASE_URL}/ingredients`, {
        headers: HEADERS,
    })

export const getOrderNumber = async (ingredients) =>
    await request(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(ingredients),
})
