import {
    createAdminRep,
    createUserRep,
    getAllUsersRep,
    getUserByEmailOrNameRep,
    getUserByIdRep, updateUserRep
} from "../services/user/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const user = await createUserRep(req.body);
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, email: user.email, username: user.username, role: user.role }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username="", email="", password } = await req.body;

        const loginValue = email || username;

        const user = await getUserByEmailOrNameRep(loginValue);
        if (!user) return res.status(401).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000, // 1 година
        });

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, email: user.email, username: user.username, role: user.role }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message });
    }
};


export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        // secure: true, // Use only over HTTPS
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logout successful' });
};

export const registerAdmin = async (req, res) => {
    try {
        const admin = await createAdminRep(req.body);
        res.status(201).json({
            message: "Admin registered successfully",
            user: { id: admin._id, email: admin.email, username: admin.username, role: admin.role }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserByIdRep(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const safeUser = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        };
        res.status(200).json({ safeUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserByEmailAndName = async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await getUserByEmailOrNameRep(email, username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const safeUser = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        };
        res.status(200).json({ safeUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersRep();
        const safeUsers = users.map(user => ({
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        }));
        res.status(200).json(safeUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        const updatedUser = await updateUserRep(userId, data);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

