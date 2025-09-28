import React from 'react';
import { Star, Forward, ThumbsUp, ThumbsDown } from 'lucide-react';

import { useAuthStore } from '../../Store/useAuthStore';

export default function JokeInteract({ likeJoke, toggleFavorite, setShowPopup, sendRaiting, randomjoke }) {
    const [localDelta, setLocalDelta] = React.useState(0);

    const { user } = useAuthStore();

    const [voteMap, setVoteMap] = React.useState(() => JSON.parse(localStorage.getItem('voteMap') || '{}'));
    const vote = randomjoke ? voteMap[randomjoke._id] : null;

    React.useEffect(() => {
        localStorage.setItem('voteMap', JSON.stringify(voteMap));
    }, [voteMap]);

    const handleVote = (type) => {
        if (!randomjoke) return;

        const current = voteMap[randomjoke._id]; // поточний стан
        let delta = 0;

        if (!current) {
            delta = type === 'like' ? 1 : -1;
        } else if (current === type) {
            delta = type === 'like' ? -1 : 1;
        } else {
            delta = type === 'like' ? 2 : -2;
        }

        setVoteMap((prev) => ({
            ...prev,
            [randomjoke._id]: current === type ? undefined : type,
        }));

        setLocalDelta((prev) => prev + delta); // викликаємо окремо один раз

        sendRaiting(randomjoke._id, user.id, { action: type });
    };

    if (!randomjoke) return <p>Loading...</p>;

    return (
        <div className="flex justify-between">
            <div className="flex justify-center items-center bg-[#2b2b2b] p-2 w-[30px] h-[30px] sm:w-[35px] md:w-[40px] lg:w-[45px] xl:w-[50px] sm:h-[35px] md:h-[40px] lg:h-[45px] xl:h-[50px] rounded-[20%]">
                <Star
                    color="#EDF26D"
                    fill={likeJoke ? '#EDF26D' : 'none'}
                    className="cursor-pointer"
                    onClick={() => toggleFavorite(randomjoke)}
                />
            </div>

            <div className="flex gap-3 items-center justify-center">
                <div className="flex justify-center items-center bg-[#2b2b2b] p-2 w-[30px] h-[30px] sm:w-[35px] md:w-[40px] lg:w-[45px] xl:w-[50px] sm:h-[35px] md:h-[40px] lg:h-[45px] xl:h-[50px] rounded-[20%]">
                    <ThumbsUp
                        color="white"
                        fill={vote === 'like' ? 'white' : 'none'}
                        className="cursor-pointer"
                        onClick={() => handleVote('like')}
                    />
                </div>
                <p className="text-white text-[20px]">Rating: {(randomjoke.rating || 0) + localDelta}</p>
                <div className="flex justify-center items-center bg-[#2b2b2b] p-2 w-[30px] h-[30px] sm:w-[35px] md:w-[40px] lg:w-[45px] xl:w-[50px] sm:h-[35px] md:h-[40px] lg:h-[45px] xl:h-[50px] rounded-[20%]">
                    <ThumbsDown
                        color="white"
                        fill={vote === 'dislike' ? 'white' : 'none'}
                        className="cursor-pointer"
                        onClick={() => handleVote('dislike')}
                    />
                </div>
            </div>

            <div
                className="flex justify-center items-center bg-[#2b2b2b] p-2 w-[75px] h-[30px] sm:w-[80px] md:w-[85px] lg:w-[90px] xl:w-[100px] sm:h-[35px] md:h-[40px] lg:h-[45px] xl:h-[50px] rounded-[10px] gap-1 cursor-pointer"
                onClick={() => setShowPopup(true)}>
                <Forward color="white" />
                <h2 className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-white">
                    Share
                </h2>
            </div>
        </div>
    );
}
