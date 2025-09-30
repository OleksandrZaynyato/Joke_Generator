import { Router } from 'express';
import {
    register,
    login,
    logout,
    registerAdmin,
    getAllUsers,
    getUserById,
    getUserByEmailAndName,
    updateUser, updateFavourites
} from '../controllers/UserController.js';
import {authAdmin} from "../middlewares/authAdmin.js";
import passport from "../config/passport.js";
import {authorizeRoles} from "../middlewares/authRoles.js";
import {validate} from "../middlewares/validate.js";
import {registerUserSchema} from "../validators/user/userRegisterValidator.js";
import {userIdSchema} from "../validators/user/userIdValidator.js";
import {userLoginSchema} from "../validators/user/userLoginValidator.js";
import {userUpdateFavouritesSchema} from "../validators/user/userUpdateFavourites.js";

const router = Router();

router.post('/register', validate(registerUserSchema), register);
router.post('/register-admin', passport.authenticate("jwt", { session: false }), authorizeRoles("admin"), validate(registerUserSchema), registerAdmin );
router.post('/login', validate(userLoginSchema), login);
router.post('/logout', logout);
router.get('/users', getAllUsers);
router.get('/:id', validate(userIdSchema), getUserById);
router.post('/find', getUserByEmailAndName);
router.put('/:id', passport.authenticate("jwt", { session: false }), authorizeRoles("admin"), updateUser);
router.post('/favorite/:id', passport.authenticate("jwt", { session: false }), validate(userUpdateFavouritesSchema), updateFavourites);

export default router;