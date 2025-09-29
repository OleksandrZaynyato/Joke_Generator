import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

export default function MainPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const API_URL = import.meta.env.VITE_API_URL;

    const [randomjoke, setRandomjoke] = useState(null);
    const [favoriteJokes, setFavoriteJokes] = useState(() => {
        const saved = localStorage.getItem('favoriteJokes');
        return saved ? JSON.parse(saved) : [];
    });
    const [likeJoke, setLikeJoke] = useState(false);
    const [showLikeButton, setShowLikeButton] = useState(false);
    const [user, setUser] = useState(null);
    const [tg, setTg] = useState(null);

    const ADMIN_IDS = [1795893529, 1188397898, 1506727765];

    // Функція для відкриття адмінки
    const openAdminPanel = () => {
        navigate('/admin');
    };

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

                    setUser({
                        telegramId: userData.id,
                        firstName: userData.first_name,
                        lastName: userData.last_name || '',
                        username: userData.username || '',
                        role: userRole
                    });

                    localStorage.setItem('telegramUser', JSON.stringify({
                        telegramId: userData.id,
                        firstName: userData.first_name,
                        lastName: userData.last_name || '',
                        username: userData.username || '',
                        role: userRole
                    }));
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

    useEffect(() => {
        if (tg && tg.BackButton) {
            const handleBackButton = () => {
                navigate(-1);
            };

            if (location.pathname === '/') {
                tg.BackButton.hide();
            } else {
                tg.BackButton.show();
            }

            tg.BackButton.onClick(handleBackButton);

            return () => {
                tg.BackButton.offClick(handleBackButton);
            };
        }
    }, [tg, navigate, location.pathname]);

    async function getJokeById(jokeId) {
        try {
            const response = await fetch(`${API_URL}/jokes/${jokeId}`);
            if (!response.ok) throw new Error('Joke not found');
            const data = await response.json();
            setRandomjoke(data);
            setLikeJoke(favoriteJokes?.some((j) => j?._id === data?._id) || false);
        } catch (error) {
            console.error('Error fetching joke:', error);
            getRandomJoke();
        }
    }

    async function getRandomJoke() {
        try {
            const response = await fetch(`${API_URL}/jokes/random`);
            if (!response.ok) throw new Error('Failed to fetch random joke');
            const data = await response.json();

            if (!data || !data._id) {
                throw new Error('Invalid joke data received');
            }

            setRandomjoke(data);
            const isFavorite = favoriteJokes?.some((j) => j?._id === data?._id) || false;
            setLikeJoke(isFavorite);
            navigate(`/${data._id}`);
        } catch (error) {
            console.error('Error fetching random joke:', error);
        }
    }

    function toggleFavorite(joke) {
        if (!joke || !joke._id) return;

        setFavoriteJokes((prev) => {
            const exists = prev?.find((j) => j?._id === joke._id);
            const updated = exists ? prev?.filter((j) => j?._id !== joke._id) : [...(prev || []), joke];
            return updated || [];
        });
        setLikeJoke((prev) => !prev);
    }

    useEffect(() => {
        localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes || []));
    }, [favoriteJokes]);

    useEffect(() => {
        if (id) {
            getJokeById(id);
            setShowLikeButton(true);
        } else {
            getRandomJoke();
        }
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] min-h-screen bg-[#2B2B2B] p-4">
            <Line />

            {user && (
                <div className="text-white text-lg">
                    Welcome, {user.firstName}! {user.role === 'admin' && '👑'}
                </div>
            )}

            <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold text-white text-center">
                Jokes Generator
            </h1>

            <div className="bg-[#313131] w-full max-w-[500px] min-h-[260px] rounded-[20px] px-[26px] py-[18px] flex flex-col justify-between gap-[20px]">
                {randomjoke ? (
                    <div className="flex flex-col gap-4">
                        <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] text-white flex gap-[10px] break-words">
                            <span className="min-w-[12px] h-[12px] bg-white rounded-full inline-block mt-2 flex-shrink-0"></span>
                            {randomjoke.setup}
                        </p>
                        <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] text-[#F8D57E] flex gap-[10px]">
                            <span className="min-w-[12px] h-[12px] bg-[#F8D57E] rounded-full inline-block mt-2 flex-shrink-0"></span>
                            {randomjoke.punchline}
                        </p>
                    </div>
                ) : (
                    <p className="text-[28px] text-white opacity-40 text-center">Loading joke...</p>
                )}

                {showLikeButton && randomjoke && (
                    <div className="flex justify-center">
                        <div className="bg-[#2b2b2b] p-3 rounded-full cursor-pointer hover:scale-110 transition-transform">
                            <Star
                                size={32}
                                color="#EDF26D"
                                fill={likeJoke ? '#EDF26D' : 'none'}
                                onClick={() => toggleFavorite(randomjoke)}
                            />
                        </div>
                    </div>
                )}
            </div>

            <Button
                bg="bg-[#F8D57E] hover:bg-[#E8C56E]"
                onClick={() => {
                    getRandomJoke();
                    setShowLikeButton(true);
                }}
            >
                Generate New Joke
            </Button>

            <div className="flex gap-[30px] sm:flex-row flex-col">
                <Link to="/add-joke" className="no-underline">
                    <Button bg="bg-[#BFAFF2] hover:bg-[#AF9FE2]">Add my Joke</Button>
                </Link>
                <Link to={'/favorites'} className="no-underline">
                    <Button bg="bg-[#A8F38D] hover:bg-[#98E37D]">Favorites ({favoriteJokes?.length || 0})</Button>
                </Link>

                {user?.role === 'admin' && (
                    <button
                        onClick={openAdminPanel}
                        className="no-underline"
                    >
                        <Button bg="bg-red-500 hover:bg-red-400">Admin Panel 👑</Button>
                    </button>
                )}
            </div>

            <Line />
        </div>
    );
}