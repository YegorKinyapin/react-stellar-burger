export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
    return fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (!res.ok) {
            throw new Error('Error occured') 
        }
        return res.json()
      })
}

// export const request = (endpoint, options) => {
//   return fetch(`${BASE_URL}${endpoint}`, options)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка ${res.status}`)
//     }
//   )
//     .then((res) => {
//       if (res && res.success) {
//         return res;
//       }
//       return Promise.reject(`Ответ не success: ${res}`)
//     })
// };