import React from 'react';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

import { Link } from 'react-router-dom';

export default function FavoritesJokes() {
    const [favoriteJokes, setFavoriteJokes] = React.useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    async function getFavoriteJokes() {
        try {
            const response = await fetch(`${API_URL}/user/favourite`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFavoriteJokes(data.favourites);
        } catch (error) {
            console.error('Fetch favorite jokes failed:', error);
        }
    }

    async function updateFavouriteJokes(id) {
        try {
            const response = await fetch(`${API_URL}/user/favourite/${id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Send favorite jokes failed:', error);
        }
    }

    React.useEffect(() => {
        getFavoriteJokes();
    }, []);

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] min-h-screen bg-[#2B2B2B]">
            <div className="w-full flex items-center justify-between flex-col pt-10">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-[28px] font-bold text-white mx-auto">Favorites Jokes</h2>
                    <Link to={'/'}>
                        <Button bg={'bg-[#BFAFF2]'}>Back</Button>
                    </Link>
                </div>
                <Line />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-15 justify-items-center">
                {favoriteJokes.map((joke) => (
                    <div key={joke._id} className="flex flex-col items-center gap-4">
                        <div className="bg-[#313131] w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] min-h-[300px] rounded-[20px] px-[26px] py-[18px] flex flex-col h-full">
                            <p
                                className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-white flex  gap-[10px]"
                                id="setup">
                                <span className="min-w-[9px] h-[9px] bg-white rounded-full inline-block  mt-2 lg:mt-4 sm:min-w-[10px] sm:h-[10px] md:min-w-[12px] md:h-[12px] lg:min-w-[14px] lg:h-[14px]"></span>
                                {joke.setup}
                            </p>
                            <p
                                className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-[#F8D57E] flex gap-[10px]"
                                id="punchline">
                                <span className="min-w-[9px] h-[9px] bg-[#F8D57E] rounded-full inline-block  mt-2 lg:mt-4 sm:min-w-[10px] sm:h-[10px] md:min-w-[12px] md:h-[12px] lg:min-w-[14px] lg:h-[14px]"></span>
                                {joke.punchline}
                            </p>
                        </div>

                        <Button
                            bg={'bg-[#F2AFB0]'}
                            width={'min-w-full'}
                            onClick={() => {
                                const updated = favoriteJokes.filter((item) => item._id !== joke._id);
                                setFavoriteJokes(updated);
                                localStorage.setItem('favoriteJokes', JSON.stringify(updated));
                                updateFavouriteJokes(joke._id);
                            }}>
                            Remove
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex gap-[35px]"></div>
            <Line />
        </div>
    );
}
