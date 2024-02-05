// import { useDispatch } from "react-redux";
import { setUser, userRequest, setAuthChecked, setLogout, logoutRequest, setUpdate, setUpdateRequest, forgotRequest, forgotSuccess, resetRequest, resetSuccess } from "../services/reducers/userReducer";

export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// const dispatch = useDispatch();

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

export const register = (data) => {
  return (dispatch) => {
    dispatch(userRequest(true));
    return fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        dispatch(setUser(data))
        console.log(data)
      }
    })
    .catch(err => console.error('Error:', err))
    .finally(() => dispatch(userRequest(false)));
  }
}

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((error) => {
          localStorage.removeItem("accessToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
      dispatch(setUser(null));
    }
  };
};

export const getUser = () => {
  return (dispatch) => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
      }
    })
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(checkReponse)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUser(res.user));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setAuthChecked(true)));
  };
};

export const logout= () => {
  return (dispatch) => {
    dispatch(logoutRequest(true));
    return fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      })
    })
    .then(checkReponse)
    .then(res => {
      if (res.success) {
        dispatch(setLogout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.log(res);
      }
    })
    .catch(err => {
      console.error(`Ошибка: ${err}`)
    })
    .finally(() => dispatch(logoutRequest(true)));
  }
}

const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  }).then(checkReponse);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const update = (name, email, pass) => {
  return (dispatch) => {
    dispatch(setUpdateRequest(true));
    return fetch(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pass
      })
    })
    .then(checkReponse)
    .then(res => {
      if (res.success) {
        dispatch(setUpdate(res));
        console.log(res)
      }
    })
    .catch(err => console.error(`Error: ${err}`))
    .finally(() => dispatch(setUpdateRequest(false)));
  }
}

export const forgot = (email) => {
  return (dispatch) => {
    dispatch(forgotRequest(true));
    return fetch(`${BASE_URL}/password-reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
    .then(checkReponse)
    .then(res => {
      if(res.success) {
        dispatch(forgotSuccess(true));
      }
    })
    .catch(err => console.error(`Error: ${err}`))
    .finally(() => dispatch(forgotRequest(false)));
  }
}

export const reset = (password, code) => {
  return (dispatch) => {
    dispatch(resetRequest(true));
    return fetch(`${BASE_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: code,
      }),
    })
    .then(checkReponse)
    .then(res => {
      if(res.success) {
        dispatch(resetSuccess(true));
      }
    })
    .catch(err => console.error(`Error: ${err}`))
    .finally(() => dispatch(resetRequest(false)));
}
}