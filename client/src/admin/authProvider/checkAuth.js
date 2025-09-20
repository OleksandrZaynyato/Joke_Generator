export const checkAuth = () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
