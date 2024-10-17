import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { DataUser } from '../@type/forms';

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    user: DataUser;
    updateUser: (updatedData: any) => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            fetchUserInfo(savedToken); 
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8000/authentication_token', { email, password });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                setToken(token);
                const decodedUser: any = jwtDecode(token);
                fetchUserInfo(token);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    const fetchUserInfo = async (token: string) => {
        try {
            const response = await axios.get('http://localhost:8000/api/me', { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
            console.log('User fetched:', response.data);
            
        } catch (error) {
            console.error('Erreur lors de la récupération des informations utilisateur:', error);
            logout(); 
        }
    };

    const updateUser = async (updatedData: any) => {
        if (!user || !token) return;
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/users/${user.id}`, 
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/merge-patch+json',
                    },
                }
            );
            setUser(response.data);  
        } catch (error) {
            console.error('Erreur lors de la mise à jour des infos utilisateur:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
