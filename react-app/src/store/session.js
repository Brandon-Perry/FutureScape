const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resJson = await response.json()
    if (Object.keys(resJson).includes('errors')) return response;
    dispatch(setUser(resJson));
    return response
}

export const login = (user) => async(dispatch) => {
    const {email, password} = user;
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    let userJson = await response.json()
    if (Object.keys(userJson).includes('errors')) {
        console.log('----------')
        console.log('HIT ERRORS LIKE 45 SESSION.JS')
    }
    if (Object.keys(userJson).includes('errors')) return
    dispatch(setUser(userJson))
}

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        method:'GET',
        headers: {'Content-Type':'application/json'},
    });
    dispatch(removeUser());
    return response
}

const intialState = {user:null};

const sessionReducer = (state = intialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            console.log('-----------')
            console.log('hit SET_USER in reducer')
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState
        
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState

        default:
            return state;
    }

}

export default sessionReducer