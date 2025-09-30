import React, { useState } from 'react';
import { User, Mail, LockKeyhole } from 'lucide-react';
import Swal from 'sweetalert2';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';
import { useAuthStore } from '../../Store/useAuthStore';
import { useNavigate } from 'react-router';
export default function LoginPage() {
    const { setUser } = useAuthStore();
    const navigate = useNavigate();

    async function sendUserData() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loginValue: userNameOrEmail,
                    email: userNameOrEmail,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login response:', data);

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.user.id);

                setUser(data.user);
                setUserNameOrEmail('');
                setPassword('');
                Swal.fire({
                    title: 'Login successful!',
                    text: 'Thank you for logging in!',
                    icon: 'success',
                    theme: 'dark',
                });

                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    const [userNameOrEmail, setUserNameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] min-h-screen bg-[#2B2B2B]">
            <Line />
            <h1 className="text-[60px] font-bold text-white">Login</h1>
            <div className="bg-[#313131] w-[25%] min-w-[410px] h-[300   px] rounded-[20px] flex flex-col items-center justify-center gap-[27px] px-[23px] py-[32px]">
                <div className="bg-[#2B2B2B] w-full min-w-[365px] h-[60px] rounded-[16px] flex text-white items-center px-[20px] gap-2">
                    <User />
                    <input
                        type="text"
                        placeholder="Username"
                        className="placeholder:text-white outline-none w-full"
                        onChange={(e) => setUserNameOrEmail(e.target.value)}
                        value={userNameOrEmail}
                    />
                </div>
                <div className="bg-[#2B2B2B] w-full min-w-[365px] h-[60px] rounded-[16px] flex text-white items-center px-[20px] gap-2">
                    <LockKeyhole />
                    <input
                        type="password"
                        placeholder="Password"
                        className="placeholder:text-white outline-none w-full"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-[35px]">
                <Button bg={'bg-[#F8D57E]'} onClick={sendUserData}>
                    Login
                </Button>
                <Button bg={'bg-[#BFAFF2]'} onClick={() => navigate('/')}>
                    Back
                </Button>
            </div>
            <Line />
        </div>
    );
}
