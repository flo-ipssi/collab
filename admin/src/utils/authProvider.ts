import { AuthProvider } from "react-admin";
import { LOGIN_ENTRYPOINT } from "../config/entrypoint";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const request = new Request(LOGIN_ENTRYPOINT, {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }

    const { token } = await response.json();
    localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('token'); 
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
