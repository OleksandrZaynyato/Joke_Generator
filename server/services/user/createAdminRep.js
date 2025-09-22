import User from '../../models/User.js';
import bcrypt from "bcrypt";

export async function createAdminRep({email, username, password}) {
    try {
        const existingAdmin = await User.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            throw new Error('Admin with this email or username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new User({
            email,
            username,
            password: hashedPassword,
            role: 'admin'
        });

        await newAdmin.save();
        return { message: 'Admin created successfully', admin: newAdmin };
    } catch (error) {
        throw new Error(`Error creating admin user: ${error.message}`);
    }
}