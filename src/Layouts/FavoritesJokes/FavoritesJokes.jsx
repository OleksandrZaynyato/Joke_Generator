import React from 'react';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

import { Link } from 'react-router-dom';

export default function FavoritesJokes() {
    const [favoriteJokes, setFavoriteJokes] = React.useState(() => {
        const saved = localStorage.getItem('favoriteJokes');
        return saved ? JSON.parse(saved) : [];
    });

    console.log(favoriteJokes);

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
                        <div className="bg-[#313131] w-[500px] h-[300px] rounded-[20px] px-[26px] py-[18px] flex flex-col">
                            <p className="text-[28px] text-white flex  gap-[10px]" id="setup">
                                <span className="min-w-[14px] h-[14px] bg-white rounded-full inline-block mt-4"></span>
                                {joke.text}
                            </p>
                            <p className="text-[28px] text-[#F8D57E] flex gap-[10px]" id="punchline">
                                <span className="min-w-[14px] h-[14px] bg-[#F8D57E] rounded-full inline-block mt-4"></span>
                                {joke.punchline}
                            </p>
                        </div>

                        <Button
                            bg={'bg-[#F2AFB0]'}
                            width={'w-[100%]'}
                            onClick={() => {
                                const updated = favoriteJokes.filter((item) => item._id !== joke._id);
                                setFavoriteJokes(updated);
                                localStorage.setItem('favoriteJokes', JSON.stringify(updated));
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
