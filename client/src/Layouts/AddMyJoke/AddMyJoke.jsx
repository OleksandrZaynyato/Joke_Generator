import React from 'react';
import {Link} from 'react-router';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

export default function AddMyJoke() {
    const API_URL = import.meta.env.VITE_API_URL;

    const sendMyJoke = async (joke) => {
        try {
            const response = await fetch(`${API_URL}/jokes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(joke),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        } catch (e) {
            console.log(e);
        }
    };

    const [myJokes, setMyJokes] = React.useState({});

    const [mySetup, setMySetup] = React.useState('');
    const [myPunchline, setMyPunchline] = React.useState('');

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] min-h-screen bg-[#2B2B2B]">
            <Line/>
            <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold text-white">
                Write your Joke
            </h1>
            <div className="flex flex-col items-center justify-between gap-[15px] w-full">
                <div
                    className="bg-[#313131] w-[35%] min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] h-[140px] rounded-[20px] px-[26px] py-[18px]">
                    <textarea
                        className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-white placeholder:opacity-40 outline-none w-full h-full resize-none [&::-webkit-scrollbar]:hidden"
                        placeholder="Setup..."
                        onChange={(e) => setMySetup(e.target.value)}
                        value={mySetup}
                    />
                </div>
                <div
                    className="bg-[#313131] w-[35%] min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] h-[102px] rounded-[20px] px-[26px] py-[18px]">
                    <textarea
                        className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-white placeholder:opacity-40 outline-none w-full h-full resize-none [&::-webkit-scrollbar]:hidden"
                        placeholder="Punchline..."
                        onChange={(e) => setMyPunchline(e.target.value)}
                        value={myPunchline}
                    />
                </div>
            </div>
            <Button
                bg={'bg-[#F8D57E]'}
                onClick={() => {
                    const joke = {setup: mySetup, punchline: myPunchline};
                    setMyJokes(joke);
                    sendMyJoke(joke);
                    setMySetup('');
                    setMyPunchline('');
                }}>
                Send
            </Button>

            <Link to="/">
                <Button bg={'bg-[#BFAFF2]'}>Back</Button>
            </Link>
            <Line/>
        </div>
    );
}
