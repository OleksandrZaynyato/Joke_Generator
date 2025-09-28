import React from 'react';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

export default function TopJokes() {
    const navigate = useNavigate();

    const [topJokes, setTopJokes] = React.useState([]);

    async function getTopJokes() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/jokes/top`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setTopJokes(data);
            console.log('Top Jokes:', data);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        getTopJokes();
    }, []);

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] min-h-screen bg-[#2B2B2B]">
            <div className="w-full flex items-center justify-between flex-col pt-10">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-[28px] font-bold text-white mx-auto">Top 10 Jokes</h2>
                    <Link to={'/'}>
                        <Button bg={'bg-[#BFAFF2]'}>Back</Button>
                    </Link>
                </div>
                <Line />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-15 justify-items-center">
                {topJokes.map((joke) => (
                    <div
                        key={joke._id}
                        className={`flex flex-col items-center gap-4 ${
                            topJokes.indexOf(joke) === 0 ? 'col-span-1 xl:col-span-2' : ''
                        }`}>
                        <p className={`${topJokes.indexOf(joke) + 1 == 1 ? 'text-[#F8D57E]' : 'text-white'} text-2xl `}>
                            #{topJokes.indexOf(joke) + 1} {topJokes.indexOf(joke) + 1 == 1 && ' - best joke🥇'}
                        </p>
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

                        <Button bg={'bg-[#A8F38D]'} width={'w-[100%]'} onClick={() => navigate(`/${joke._id}`)}>
                            Show
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex gap-[35px]"></div>
            <Line />
        </div>
    );
}
