import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { sendSignInData , refreshToken } from "./api/api";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
    
    const navigator = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null);
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)

    const loginUser = async (userData) => {
        var { data } = await sendSignInData(userData);
        console.log(data)

        if(data){
            setAuthTokens(data);
            setUser(jwt_decode(data?.access));
            localStorage.setItem('authTokens' , JSON.stringify(data));
            navigator('/');
        }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigator('/');
    }

    const updateTokens = async() => {
        console.log({refresh: authTokens.refresh})
        const {data} = await refreshToken({refresh: authTokens.refresh});
        console.log('data in refresh function' , data);

        if(data){
            setAuthTokens(data);
            setUser(jwt_decode(data?.access));
            localStorage.setItem('authTokens' , JSON.stringify(data));
        }else {
            logoutUser();
        }
    }

    let contextValue = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {
        let fourMinutes = 60 * 1000 * 4;

        let interval = setInterval(() => {
            if(authTokens){
                updateTokens();
            }
        } , fourMinutes);

        return () => clearInterval(interval); 


    } , [authTokens , loading])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}