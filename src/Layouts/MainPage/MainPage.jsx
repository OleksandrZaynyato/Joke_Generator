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

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] h-screen bg-[#2B2B2B]">
            <Line />
            <h1 className="text-[60px] font-bold text-white">Jokes Generator</h1>

            <div className="bg-[#313131] w-[35%] min-w-[500px] h-[260px] rounded-[20px] px-[26px] py-[18px] flex flex-col justify-between">
                {randomjoke ? (
                    <div>
                        <p className="text-[28px] text-white flex items-center gap-[10px] break-words w-full line-clamp-3">
                            <span className="min-w-[14px] h-[14px] bg-white rounded-[50%] inline-block"></span>
                            {randomjoke.text}
                        </p>
                        <p className="text-[28px] text-[#F8D57E] flex items-center gap-[10px]">
                            <span className="min-w-[14px] h-[14px] bg-[#F8D57E] rounded-[50%] inline-block"></span>
                            {randomjoke.punchline}
                        </p>
                    </div>
                ) : (
                    <p className="text-[28px] text-white opacity-40">Joke will be here...</p>
                )}

                <div className="flex justify-center items-center bg-[#2b2b2b] p-2 w-[50px] h-[50px] rounded-[20%]">
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
            </div>

            <Button
                bg="bg-[#F8D57E]"
                onClick={() => {
                    getRandomJoke();
                }}>
                Generate
            </Button>

            <div className="flex gap-[30px]">
                <Link to="/add-joke">
                    <Button bg="bg-[#BFAFF2]">Add my Joke</Button>
                </Link>
                <Button bg="bg-[#A8F38D]">Favorites</Button>
            </div>
            <Line />
        </div>
    );
}
