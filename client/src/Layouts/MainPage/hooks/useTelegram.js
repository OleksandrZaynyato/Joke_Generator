// src/Layouts/MainPage/hooks/useTelegram.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_IDS = [1795893529, 1188397898, 1506727765];

export const useTelegram = () => {
    const navigate = useNavigate();
    const [tg, setTg] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initTelegram = () => {
            if (window.Telegram && window.Telegram.WebApp) {
                const telegramApp = window.Telegram.WebApp;
                setTg(telegramApp);

                telegramApp.expand();

                const userData = telegramApp.initDataUnsafe?.user;
                if (userData) {
                    const isAdmin = ADMIN_IDS.includes(userData.id);
                    const userRole = isAdmin ? 'admin' : 'user';

                    const userObj = {
                        telegramId: userData.id,
                        firstName: userData.first_name,
                        lastName: userData.last_name || '',
                        username: userData.username || '',
                        role: userRole
                    };

                    setUser(userObj);
                    localStorage.setItem('telegramUser', JSON.stringify(userObj));
                }
            }
        };

        if (!window.Telegram) {
            const script = document.createElement('script');
            script.src = 'https://telegram.org/js/telegram-web-app.js';
            script.async = true;
            script.onload = initTelegram;
            document.head.appendChild(script);
        } else {
            initTelegram();
        }
    }, [navigate]);

    return { tg, user };
};