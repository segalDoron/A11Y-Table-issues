import React from "react";

import succuess from '@/assets/success.webp';
import nothigToSee from '@/assets/nothing-here.webp';
import somethingWantWrong from '@/assets/something-went-wrong.webp';
import './placeHolder.css'

const Types = {
  error: {
    imgSrc: somethingWantWrong, 
    alt: "Oops something went wrong"
  },
  success : {
    imgSrc: succuess, 
    alt: "Greate sucess"
  },
  empty : {
    imgSrc: nothigToSee,
    alt: "Nothis to see here"
  }
} as const;

type ButtonProps = {
  buttonText: string;
  action: () => void;
};

type PlaceHolderProps = {
    type: keyof typeof Types;
    buttonProps?: ButtonProps;
    infoText?: string;
    width?: string;
    height?: string;
    
};

const PlaceHolder = ({type, buttonProps, width = 'auto', height = 'auto' ,infoText = ''}: PlaceHolderProps) => {
    
    if (!buttonProps && !type) {
        return null;
    }

    const { imgSrc, alt } = Types[type] || {};
    const {action, buttonText} = buttonProps || {};

    return (
        <div className="placeHolderRoot">
            <img
                src={imgSrc}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
            />
            <div>{infoText}</div>
            {buttonProps && (
              <button onClick={action}>{buttonText}</button>
            )}
        </div>
    );
}

export default PlaceHolder;