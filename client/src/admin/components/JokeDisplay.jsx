import React from 'react';
import { Star } from 'lucide-react';

export const JokeDisplay = ({ 
    randomjoke, 
    likeJoke, 
    showLikeButton, 
    onToggleFavorite 
}) => {
    if (!randomjoke) {
        return (
            <p className="text-[28px] text-white opacity-40 text-center">
                Loading joke...
            </p>
        );
    }

    return (
        <div className="bg-[#313131] w-full max-w-[500px] min-h-[260px] rounded-[20px] px-[26px] py-[18px] flex flex-col justify-between gap-[20px]">
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

            {showLikeButton && (
                <div className="flex justify-center">
                    <div className="bg-[#2b2b2b] p-3 rounded-full cursor-pointer hover:scale-110 transition-transform">
                        <Star
                            size={32}
                            color="#EDF26D"
                            fill={likeJoke ? '#EDF26D' : 'none'}
                            onClick={onToggleFavorite}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};