import { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
}

if(localStorage.getItem('userToken')){
    const decodedToken = jwtDecode(localStorage.getItem('userToken'));

    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('userToken');
    } else {
        //console.log(decodedToken);
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

function authReducer(state, action){
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
            break;
    
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
            break;

        default:
            return state;
            break;
    }
};

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = userData => {
        localStorage.setItem("userToken", userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem("userToken");
        dispatch({
            type: 'LOGOUT',
        })
    }

    return (
        <AuthContext.Provider 
            value={{user: state.user, login, logout}}
            { ...props }    
        />
    )
}

export { AuthContext, AuthProvider };