import React from "react";

import somethingWantWrong from '../../assets/something-went-wrong.webp';
import './placeHolder.css'

const Types = {
  error: {
    imgSrc: somethingWantWrong, 
    alt: "Oops something went wrong"
  },
  empty : {
    imgSrc: somethingWantWrong, 
    alt: "Nothing to show"
  }
} as const;

type ButtonProps = {
  buttonText: string;
  action: () => void;
};

type PlaceHolderProps = {
    type: keyof typeof Types;
    buttonProps?: ButtonProps;
};

const PlaceHolder = ({type, buttonProps}: PlaceHolderProps) => {
    
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
                width="600"
                height="300"
                loading="lazy"
                decoding="async"
            />
            {buttonProps && (
              <button onClick={action}>{buttonText}</button>
            )}
        </div>
    );
}

export default PlaceHolder;