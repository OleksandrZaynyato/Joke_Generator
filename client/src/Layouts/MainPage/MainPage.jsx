import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';
import JokeTemplate from '../../UI/JokeTemplate/JokeTemplate';

export default function MainPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [randomjoke, setRandomjoke] = React.useState(null);
    const [likeJoke, setLikeJoke] = React.useState(false);
    const [showLikeButton, setShowLikeButton] = React.useState(false);
    const [favoriteJokes, setFavoriteJokes] = React.useState(() => {
        const saved = localStorage.getItem('favoriteJokes');
        return saved ? JSON.parse(saved) : [];
    });

    async function getJokeById(jokeId) {
        const response = await fetch(`http://localhost:3000/api/jokes/${jokeId}`);
        const data = await response.json();
        setRandomjoke(data);
        setLikeJoke(favoriteJokes.some((j) => j._id === data._id));
    }

    async function getRandomJoke() {
        const response = await fetch('http://localhost:3000/api/jokes/random');
        const data = await response.json();
        setRandomjoke(data);

        setLikeJoke(favoriteJokes.some((j) => j._id === data._id));
        navigate(`/${data._id}`);
    }

    function toggleFavorite(joke) {
        setFavoriteJokes((prev) => {
            const exists = prev.find((j) => j._id === joke._id);
            return exists ? prev.filter((j) => j._id !== joke._id) : [...prev, joke];
        });
        setLikeJoke((prev) => !prev);
    }

    React.useEffect(() => {
        localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes));
    }, [favoriteJokes]);

    React.useEffect(() => {
        if (id) {
            getJokeById(id);
            setShowLikeButton(true);
        } else {
            setShowLikeButton(false);
        }
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] min-h-screen bg-[#2B2B2B]">
            <Line />
            <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold text-white text-center">
                Jokes Generator
            </h1>

            <JokeTemplate
                randomjoke={randomjoke}
                likeJoke={likeJoke}
                toggleFavorite={toggleFavorite}
                showLikeButton={showLikeButton}
            />

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
