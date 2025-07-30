import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export function LoginContextProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user') || null);
    const login = (newUser, callback) => {
        setUser(newUser);
        localStorage.setItem('user', newUser);
        callback();
    };
    const logout = (callback) => {
        setUser(null);
        localStorage.removeItem('user')
        callback();
    };

    const value = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    )
};