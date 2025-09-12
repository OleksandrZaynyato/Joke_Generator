import React from 'react';
import { Link } from 'react-router';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

export default function AddMyJoke() {
    const [myJokes, setMyJokes] = React.useState([]);

    const [mySetup, setMySetup] = React.useState('');
    const [myPunchline, setMyPunchline] = React.useState('');
    return (
        <div className="flex flex-col items-center justify-between gap-[50px] h-screen bg-[#2B2B2B]">
            <Line />
            <h1 className="text-[60px] font-bold text-white">Write your Joke</h1>
            <div className="flex flex-col items-center justify-between gap-[15px] w-full">
                <div className="bg-[#313131] w-[35%] min-w-[500px] h-[140px] rounded-[20px] px-[26px] py-[18px]">
                    <textarea
                        className="text-[28px] text-white placeholder:opacity-40 outline-none w-full resize-none scroll-smooth [&::-webkit-scrollbar]:hidden"
                        placeholder="Setup..."
                        onChange={(e) => setMySetup(e.target.value)}
                    />
                </div>
                <div className="bg-[#313131] w-[35%] min-w-[500px] h-[102px] rounded-[20px] px-[26px] py-[18px]">
                    <textarea
                        className="text-[28px] text-white placeholder:opacity-40 outline-none w-full resize-none scroll-smooth [&::-webkit-scrollbar]:hidden"
                        placeholder="Punchline..."
                        onChange={(e) => setMyPunchline(e.target.value)}
                    />
                </div>
            </div>
            <Button
                bg={'bg-[#F8D57E]'}
                onClick={() => setMyJokes([...myJokes, { setup: mySetup, punchline: myPunchline }])}>
                Send
            </Button>
            <Link to="/">
                <Button bg={'bg-[#BFAFF2]'}>Back</Button>
            </Link>
            <Line />
        </div>
    );
}
