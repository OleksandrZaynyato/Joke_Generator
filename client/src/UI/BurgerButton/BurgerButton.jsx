import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

import { useAuthStore } from '../../Store/useAuthStore';

export default function BurgerButton({ handleLogout }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const { user } = useAuthStore();
    const navigate = useNavigate();

    return (
        <>
            <button
                className="relative z-20 flex flex-col justify-center items-center w-10 h-10 space-y-1 mt-0 sm:mt-6"
                onClick={() => setIsOpen((prev) => !prev)}>
                <span
                    className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                        isOpen ? 'rotate-45 translate-y-2' : ''
                    }`}></span>
                <span
                    className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                        isOpen ? 'opacity-0' : ''
                    }`}></span>
                <span
                    className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                        isOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}></span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-60 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-0 right-0 h-full w-64 bg-[#2B2B2B] z-20 shadow-xl p-6"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}>
                        <nav className="flex flex-col space-y-4 text-white text-lg relative">
                            <button
                                className="flex items-center space-x-2 bg-[#222222] px-3 py-2 rounded-md"
                                onClick={() => setIsDropdownOpen((prev) => !prev)}>
                                <User className="text-white w-5 h-5" />
                                <span>{user ? user.username : 'Account'}</span>
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        className="overflow-hidden flex flex-col shadow-lg gap-2"
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.1 }}>
                                        {user ? (
                                            <button className="text-red-300 bg-[#222222]" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="text-[#BFAFF2] bg-[#222222]"
                                                    onClick={() => navigate('/register')}>
                                                    Register
                                                </button>
                                                <button
                                                    className="text-[#F8D57E] bg-[#222222]"
                                                    onClick={() => navigate('/login')}>
                                                    Login
                                                </button>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
