// src/Layouts/MainPage/MainPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';
import { useTelegram } from './hooks/useTelegram';
import { UserWelcome } from '../../admin/components/UserWelcome';      
import { JokeDisplay } from '../../admin/components/JokeDisplay';        
import { NavigationButtons } from '../../admin/components/NavigationButtons'; 
export default function MainPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { tg, user } = useTelegram();

    const API_URL = import.meta.env.VITE_API_URL;

    const [randomjoke, setRandomjoke] = useState(null);
    const [favoriteJokes, setFavoriteJokes] = useState(() => {
        const saved = localStorage.getItem('favoriteJokes');
        return saved ? JSON.parse(saved) : [];
    });
    const [likeJoke, setLikeJoke] = useState(false);
    const [showLikeButton, setShowLikeButton] = useState(false);

    // Обробка кнопки "Назад" в Telegram
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

    function toggleFavorite() {
        if (!randomjoke || !randomjoke._id) return;

        setFavoriteJokes((prev) => {
            const exists = prev?.find((j) => j?._id === randomjoke._id);
            const updated = exists 
                ? prev?.filter((j) => j?._id !== randomjoke._id) 
                : [...(prev || []), randomjoke];
            return updated || [];
        });
        setLikeJoke((prev) => !prev);
    }

    const openAdminPanel = () => {
        navigate('/admin');
    };

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
            
            <UserWelcome user={user} />
            
            <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold text-white text-center">
                Jokes Generator
            </h1>

            <JokeDisplay
                randomjoke={randomjoke}
                likeJoke={likeJoke}
                showLikeButton={showLikeButton}
                onToggleFavorite={toggleFavorite}
            />

            <Button
                bg="bg-[#F8D57E] hover:bg-[#E8C56E]"
                onClick={() => {
                    getRandomJoke();
                    setShowLikeButton(true);
                }}
            >
                Generate New Joke
            </Button>

            <NavigationButtons
                user={user}
                favoriteJokes={favoriteJokes}
                onAdminClick={openAdminPanel}
            />
            
            <Line />
        </div>
    );
}