import {createContext , useReducer} from 'react'

export const AuthContext = createContext()

const INIT_STATE = {token: localStorage.getItem('access')}

const AuthReducer = (state , action) => {
    switch(action.type){
        case "set": 
        console.log('enter auth');
        console.log('localstorage is' , localStorage.getItem('access'));
        return {token : localStorage.getItem('access') };

        default: 
        return state
    }
}

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, INIT_STATE)

    return(
        <AuthContext.Provider value={{state,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

