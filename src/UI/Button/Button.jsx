import React from 'react';

export default function Button(props) {
    return (
        <button
            className={`${props.width || 'min-w-[175px]'} min-h-[50px] ${
                props.bg
            } rounded-[15px] text-[#333333] text-[18px] cursor-pointer`}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}
