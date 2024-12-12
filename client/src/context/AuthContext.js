import React, { createContext, useState, useEffect } from 'react';

// Crearea contextului
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Aici puteți adăuga logica pentru a verifica starea de autentificare
    // de exemplu, verificarea unui token JWT stocat în localStorage

    useEffect(() => {
        // Verificați starea de autentificare la încărcarea componentei
        // și actualizați starea isAuthenticated și user
    }, []);

    // Funcția pentru a actualiza starea de autentificare
    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        // Aici puteți salva tokenul JWT în localStorage, dacă este cazul
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        // Aici puteți elimina tokenul JWT din localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
