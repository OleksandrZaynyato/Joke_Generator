import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';

export const NavigationButtons = ({ 
    user, 
    favoriteJokes, 
    onAdminClick 
}) => {
    return (
        <div className="flex gap-[30px] sm:flex-row flex-col">
            <Link to="/add-joke" className="no-underline">
                <Button bg="bg-[#BFAFF2] hover:bg-[#AF9FE2]">Add my Joke</Button>
            </Link>
            <Link to={'/favorites'} className="no-underline">
                <Button bg="bg-[#A8F38D] hover:bg-[#98E37D]">
                    Favorites ({favoriteJokes?.length || 0})
                </Button>
            </Link>

            {user?.role === 'admin' && (
                <button onClick={onAdminClick} className="no-underline">
                    <Button bg="bg-red-500 hover:bg-red-400">Admin Panel 👑</Button>
                </button>
            )}
        </div>
    );
};