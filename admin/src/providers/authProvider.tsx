import axios from 'axios';
import * as decodeJwt from 'jwt-decode';
interface LoginData {
    username: string;
    password: string;
}

interface JwtToken {
    roles: string[];
    exp: number;
}

interface AuthProvider {
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
    checkError: (error: any) => Promise<void>;
    checkAuth: () => Promise<void>;
    getPermissions: () => Promise<string | void>;
}

const apiUrl = 'http://127.0.0.1:8000';

const customAuthProvider: AuthProvider = {
    login: async ({ username, password }) => {
        try {
            const response = await axios.post(`${apiUrl}/authentication_token`, {
                email: username,
                password: password,
            });

            const { token } = response.data;
            const decodedToken = decodeJwt(token);

            if (!decodedToken.roles.includes('ROLE_ADMIN')) {
                throw new Error('Accès interdit. Vous devez être un administrateur.');
            }
            
            localStorage.setItem('token', token);
            localStorage.setItem('role', decodedToken.roles.join(','));

        } catch (error) {
            throw new Error('Erreur de connexion. Veuillez vérifier vos informations.');
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    },

    checkError: (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    getPermissions: () => {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default customAuthProvider;
