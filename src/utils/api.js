export const getIngredients = () => {
    return fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (!res.ok) {
            throw new Error('Error occured') 
        }
        return res.json()
      })
}