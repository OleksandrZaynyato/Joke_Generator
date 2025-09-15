export const authProvider = {
    login: ({ username, password }) => {
        // Автоматично логінимся без перевірки
        localStorage.setItem('username', 'admin');
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        // Завжди вважаємо авторизованим
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};
