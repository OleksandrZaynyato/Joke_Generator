import { Router } from 'express';
import {
    register,
    login,
    logout,
    registerAdmin,
    getAllUsers,
    getUserById,
    getUserByEmailAndName,
    updateUser
} from '../controllers/UserController.js';
import {authAdmin} from "../middlewares/authAdmin.js";

const router = Router();

router.post('/register', register);
router.post('/register-admin', authAdmin, registerAdmin );
router.post('/login', login);
router.post('/logout', logout);
router.get('/users', getAllUsers);
router.get('/:id', getUserById);
router.post('/find', getUserByEmailAndName);
router.put('/:id', authAdmin, updateUser);

export default router;