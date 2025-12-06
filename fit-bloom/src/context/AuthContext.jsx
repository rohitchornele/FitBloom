import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Try to fetch current user on mount if token exists
    useEffect(() => {
        const token = localStorage.getItem("fitbloom_token");
        if (!token) {
            setLoading(false);
            return;
        }

        api.get("/auth/user-data")
            .then((res) => setUser(res.data))
            .catch(() => {
                localStorage.removeItem("fitbloom_token");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = (token, userData) => {
        localStorage.clear();
        localStorage.setItem("fitbloom_token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("fitbloom_token");
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
