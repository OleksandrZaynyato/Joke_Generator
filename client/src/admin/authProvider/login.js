import { fetchUtils } from 'react-admin';

export const login = ({ username, password }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const loginValue = username; // Can be either email or username
    return fetchUtils.fetchJson(`${API_URL}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ loginValue, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(({ json }) => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('role', json.user.role);
    });
};
