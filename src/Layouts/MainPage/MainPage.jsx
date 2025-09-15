import React from 'react';
import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';

export default function MainPage() {
    return (
        <div className="flex flex-col items-center justify-between gap-[50px] h-screen bg-[#2B2B2B]">
            <Line />
            <h1 className="text-[60px] font-bold text-white">Jokes Generator</h1>
            <div className="bg-[#313131] w-[35%] min-w-[500px] h-[260px] rounded-[20px] px-[26px] py-[18px]">
                <p className="text-[28px] text-white opacity-40">Joke will be here...</p>
            </div>
            <Button bg={'bg-[#F8D57E]'}>Generate</Button>
            <Button bg={'bg-[#BFAFF2]'}>Add my Joke</Button>
            
            <a 
                href="/admin"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Перейти до адмінки
            </a>
            
            <Line />
        </div>
    );
}