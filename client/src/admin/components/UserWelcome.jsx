import React from 'react';

export const UserWelcome = ({ user }) => {
    if (!user) return null;

    return (
        <div className="text-white text-lg">
            Welcome, {user.firstName}! {user.role === 'admin' && '👑'}
        </div>
    );
};