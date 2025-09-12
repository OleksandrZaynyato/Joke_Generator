import React from 'react';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

export default function AdminPanel() {
    const jokes = [
        {
            id: 1,
            setup: 'joke setup 1',
            punchline: 'joke punchline 1',
        },
        {
            id: 2,
            setup: 'joke setup 2',
            punchline: 'joke punchline 2',
        },
        {
            id: 3,
            setup: 'joke setup 3',
            punchline: 'joke punchline 3',
        },
    ];

    const [joke, setJoke] = React.useState(jokes[Math.floor(Math.random() * jokes.length)]);

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] h-screen bg-[#2B2B2B]">
            <div className="w-full flex items-center justify-between flex-col pt-10">
                <h2 className="text-[28px] font-bold text-white">Admin Panel</h2>
                <Line />
            </div>
            <h1 className="text-[60px] font-bold text-white">Jokes Validation</h1>
            <div className="bg-[#313131] w-[35%] min-w-[500px] h-[260px] rounded-[20px] px-[26px] py-[18px]">
                <p className="text-[28px] text-white flex items-center gap-[10px]" id="setup">
                    <span className="w-[14px] h-[14px] bg-white rounded-[50%] inline-block"></span>
                    {joke.setup}
                </p>
                <p className="text-[28px] text-[#F8D57E] flex items-center gap-[10px]" id="punchline">
                    <span className="w-[14px] h-[14px] bg-[#F8D57E] rounded-[50%] inline-block"></span>
                    {joke.punchline}
                </p>
            </div>
            <div className="flex gap-[35px]">
                <Button bg={'bg-[#CDF87E]'} onClick={() => setJoke(jokes[Math.floor(Math.random() * jokes.length)])}>
                    Accept
                </Button>
                <Button bg={'bg-[#F2AFB0]'} onClick={() => setJoke(jokes[Math.floor(Math.random() * jokes.length)])}>
                    Reject
                </Button>
            </div>
            <Line />
        </div>
    );
}
