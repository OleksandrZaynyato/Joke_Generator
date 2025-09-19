export const checkError = (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return Promise.reject();
    }
    return Promise.resolve();
};
