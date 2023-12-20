const apiEndpoints = {
  ingredients: '/ingredients',
  orders: '/orders',
}
export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export const getIngredients = () => {
    return fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (!res.ok) {
            throw new Error('Error occured') 
        }
        return res.json()
      })
}

const checkReponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
const checkSuccess = (data) => (data.success ? data : Promise.reject(data))

function request(url, options) {
  return fetch(url, options).then(checkReponse).then(checkSuccess)
}

export const getOrderNumber = async (ingredients) =>
    await request(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(ingredients),
})
