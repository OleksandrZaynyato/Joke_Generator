import React from 'react';

import { Linkedin, Facebook, Twitter, Send, MessageCircle, Mail } from 'lucide-react';
import { useParams } from 'react-router-dom';

import Button from '../Button/Button';

export default function Popup() {
    const { id } = useParams();

    const share = [
        {
            id: 1,
            name: 'LinkedIn',
            bg: 'bg-[#1C91CC]',
            icon: <Linkedin color="#fff" size={30} fill="#fff" />,
            link: `https://www.linkedin.com/sharing/share-offsite/?url=https://joke-generator-nlfs.onrender.com/${id}`,
        },
        {
            id: 2,
            name: 'Facebook',
            bg: 'bg-[#1877F2]',
            icon: <Facebook color="#fff" size={30} fill="#fff" />,
            link: `https://www.facebook.com/sharer/sharer.php?u=https://joke-generator-nlfs.onrender.com/${id}`,
        },
        {
            id: 3,
            name: 'Twitter',
            bg: 'bg-[#1DA1F2]',
            icon: <Twitter color="#fff" size={30} fill="#fff" />,
            link: `https://twitter.com/intent/tweet?url=https://joke-generator-nlfs.onrender.com/${id}&text=Check%20this%20out!`,
        },
        {
            id: 4,
            name: 'Telegram',
            bg: 'bg-[#0088cc]',
            icon: <Send color="#fff" size={30} />,
            link: `https://t.me/share/url?url=https://joke-generator-nlfs.onrender.com/${id}&text=Check%20this%20out!`,
        },
        {
            id: 5,
            name: 'WhatsApp',
            bg: 'bg-[#25D366]',
            icon: <MessageCircle color="#fff" size={30} />,
            link: `https://api.whatsapp.com/send?text=https://joke-generator-nlfs.onrender.com/${id}`,
        },
        {
            id: 6,
            name: 'Email',
            bg: 'bg-[#7B7B7B]',
            icon: <Mail color="#fff" size={30} />,
            link: `mailto:?subject=Check this out!&body=https://joke-generator-nlfs.onrender.com/${id}`,
        },
    ];

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`https://joke-generator-nlfs.onrender.com/${id}`);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div
            className="w-[305px] sm:w-[500px] md:w-[580px] lg:w-[620px] xl:min-w-[680px] min-h-[300px] md:min-h-[350px] bg-[#313131] rounded-[20px] position-absolute top-[50%] left-[50%] flex flex-col justify-between py-1 sm:py-5 gap-2 sm:gap-10"
            onClick={handlePopupClick}>
            <div>
                <h2 className="text-[28px] font-bold text-white ml-5">Share</h2>
                <div className="grid grid-cols-2 mt-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {share.map((item) => (
                        <div className="flex items-center gap-2 flex-col" key={item.id}>
                            <div className={`w-[60px] h-[60px] ${item.bg} rounded-full md:w-[75px] md:h-[75px]`}>
                                <a
                                    href={item.link}
                                    className="w-full h-full flex items-center justify-center rounded-full"
                                    target="_blank">
                                    {item.icon}
                                </a>
                            </div>
                            <h3 className="text-white text-[14px]">{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="bg-[#1D1D1D] border-[1px] border-[#484848] rounded-[15px] w-[95%] flex flex-col md:flex-row md:py-0 py-4 items-center justify-between px-[8px] gap-3 min-h-[70px] mb-8">
                    <p className="text-[18px] text-white truncate w-full">
                        {import.meta.env.VITE_FRONTEND_URL}/{id}
                    </p>
                    <Button bg={'bg-[#F8D57E]'} width={'w-full'} onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
