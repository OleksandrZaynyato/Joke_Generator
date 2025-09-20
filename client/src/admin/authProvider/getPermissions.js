export const getPermissions = () => {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject();
};
