import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,

    setUser: (user) => set({ user }),
}));
