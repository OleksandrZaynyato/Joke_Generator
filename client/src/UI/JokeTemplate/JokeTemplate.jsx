import React from 'react';

import { Star, Forward, ThumbsUp, ThumbsDown } from 'lucide-react';

import Popup from '../Popup/Popup';

export default function JokeTemplate({ randomjoke, showLikeButton, toggleFavorite, likeJoke }) {
    const [showPopup, setShowPopup] = React.useState(false);

    const handleOverlayClick = () => {
        setShowPopup(false);
    };

    return (
        <>
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
                                <ThumbsUp color="white" className="cursor-pointer" />
                            </div>
                            <p>{randomjoke?.raiting || 0}</p>
                            <div className="flex justify-center items-center bg-[#2b2b2b] p-2 w-[30px] h-[30px] sm:w-[35px] md:w-[40px] lg:w-[45px] xl:w-[50px] sm:h-[35px] md:h-[40px] lg:h-[45px] xl:h-[50px] rounded-[20%]">
                                <ThumbsDown color="white" className="cursor-pointer" />
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
                )}
            </div>
            {showPopup && (
                <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50"
                    onClick={handleOverlayClick}>
                    <Popup />
                </div>
            )}
        </>
    );
}
