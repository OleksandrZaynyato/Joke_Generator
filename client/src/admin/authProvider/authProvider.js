// export const authProvider = {
//     login: () => Promise.resolve(),
//     logout: () => Promise.resolve(),
//     checkError: () => Promise.resolve(),
//     checkAuth: () => Promise.resolve(),
//     getPermissions: () => Promise.resolve(),
//   };

import { login } from "./login";
import { logout } from "./logout";
import { checkAuth } from "./checkAuth";
import { checkError } from "./checkError";
import { getPermissions } from "./getPermissions";

export const authProvider = {
    login,
    logout,
    checkAuth,
    checkError,
    getPermissions,
};
