import { useReducer, createContext } from 'react'

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
    const [state, dispatch] = useReducer(authReducer, { user: null });

    const login = userData => {
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
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