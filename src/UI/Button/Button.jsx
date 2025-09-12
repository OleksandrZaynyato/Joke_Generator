import React from 'react';

export default function Button(props) {
    return (
        <button
            className={`w-[175px] h-[50px] ${props.bg} rounded-[15px] text-[#333333] text-[18px] cursor-pointer`}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}
