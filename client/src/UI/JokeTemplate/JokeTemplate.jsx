import React from 'react';

import Popup from '../Popup/Popup';
import JokeInteract from '../JokeInteract/JokeInteract';

export default function JokeTemplate({ randomjoke, showLikeButton, toggleFavorite, likeJoke, sendRaiting }) {
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
                    <JokeInteract
                        likeJoke={likeJoke}
                        toggleFavorite={toggleFavorite}
                        setShowPopup={setShowPopup}
                        sendRaiting={sendRaiting}
                        randomjoke={randomjoke}
                    />
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
