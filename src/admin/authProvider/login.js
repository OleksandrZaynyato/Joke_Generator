import { fetchUtils } from 'react-admin';

export const login = ({ username, password }) => {
    const API_URL = 'http://localhost:3000/api';

    return fetchUtils.fetchJson(`${API_URL}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(({ json }) => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('role', json.user.role);
    });
};
