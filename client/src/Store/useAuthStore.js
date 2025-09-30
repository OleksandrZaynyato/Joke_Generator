import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,

    setUser: (user) => set({ user }),

    login: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        set({ token: data.token, user: data.user || null });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        set({ token: null, user: null });
    },
}));
