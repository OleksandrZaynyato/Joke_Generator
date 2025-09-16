import React from 'react';
import { Link } from 'react-router';
import { Star } from 'lucide-react';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

export default function MainPage() {
    const [randomjoke, setRandomjoke] = React.useState(null);
    const [favoriteJokes, setFavoriteJokes] = React.useState(() => {
        const saved = localStorage.getItem('favoriteJokes');
        return saved ? JSON.parse(saved) : [];
    });
    const [likeJoke, setLikeJoke] = React.useState(false);

    React.useEffect(() => {
        localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes));
    }, [favoriteJokes]);

    async function getRandomJoke() {
        const response = await fetch('http://localhost:3000/api/jokes/random');
        const data = await response.json();
        setRandomjoke(data);

        setLikeJoke(favoriteJokes.some((j) => j._id === data._id));
    }
    const [showLikeButton, setShowLikeButton] = React.useState(false);

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] min-h-screen bg-[#2B2B2B]">
            <Line />
            <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold text-white text-center">
                Jokes Generator
            </h1>

            <div className="bg-[#313131] w-[35%] min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] min-h-[260px] rounded-[20px] px-[26px] py-[18px] flex flex-col justify-between gap-[20px]">
                {randomjoke ? (
                    <div>
                        <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-white flex gap-[10px] break-words w-full line-clamp-3">
                            <span className="min-w-[9px] h-[9px] bg-white rounded-full inline-block  mt-2 lg:mt-4 sm:min-w-[10px] sm:h-[10px] md:min-w-[12px] md:h-[12px] lg:min-w-[14px] lg:h-[14px]"></span>

                            {randomjoke.setup}
                        </p>
                        <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-[#F8D57E] flex gap-[10px]">
                            <span className="min-w-[9px] h-[9px] bg-[#F8D57E] rounded-full inline-block mt-2 lg:mt-4 sm:min-w-[10px] sm:h-[10px] md:min-w-[12px] md:h-[12px] lg:min-w-[14px] lg:h-[14px]"></span>

                            {randomjoke.punchline}
                        </p>
                    </div>
                ) : (
                    <p className="text-[28px] text-white opacity-40">Joke will be here...</p>
                )}

                {showLikeButton && (
                    <div className="flex justify-center items-center bg-[#2b2b2b] p-2 w-[30px] h-[30px] sm:w-[35px] md:w-[40px] lg:w-[45px] xl:w-[50px] sm:h-[35px] md:h-[40px] lg:h-[45px] xl:h-[50px] rounded-[20%]">
                        <Star
                            color="#EDF26D"
                            fill={likeJoke ? '#EDF26D' : 'none'}
                            className="cursor-pointer"
                            onClick={() => {
                                setFavoriteJokes((prev) => {
                                    const exists = prev.find((j) => j._id === randomjoke._id);
                                    if (exists) {
                                        return prev.filter((j) => j._id !== randomjoke._id);
                                    } else {
                                        return [...prev, randomjoke];
                                    }
                                });
                                setLikeJoke((prev) => !prev);
                            }}
                        />
                    </div>
                )}
            </div>

            <Button
                bg="bg-[#F8D57E]"
                onClick={() => {
                    getRandomJoke();
                    setShowLikeButton(true);
                }}>
                Generate
            </Button>

            <div className="flex gap-[30px] sm:flex-row flex-col">
                <Link to="/add-joke">
                    <Button bg="bg-[#BFAFF2]">Add my Joke</Button>
                </Link>
                <Link to={'/favorites'}>
                    <Button bg="bg-[#A8F38D]">Favorites</Button>
                </Link>
            </div>
            <Line />
        </div>
    );
}
