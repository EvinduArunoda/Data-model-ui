export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";


export function loginUser(email, password) {
    return {
        type: LOGIN_USER,
        email,
        password
    }
}

export function loginUserSuccess() {
    return {
        type: LOGIN_USER_SUCCESS
    }
}

export function loginUserError(message) {
    return {
        type: LOGIN_USER_ERROR,
        payload: {message}
    }
}
