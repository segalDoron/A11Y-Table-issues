import success from '@/assets/success.webp';
import nothingToSee from '@/assets/nothing-here.webp';
import somethingWantWrong from '@/assets/something-went-wrong.webp';
import './placeHolder.css'

const Types = {
  error: {
    imgSrc: somethingWantWrong, 
    alt: "Oops something went wrong"
  },
  success : {
    imgSrc: success, 
    alt: "Great success"
  },
  empty : {
    imgSrc: nothingToSee,
    alt: "Nothing to see here"
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
    width?: string | number;
    height?: string;
    
};

const PlaceHolder = ({type, buttonProps, width = '600', height = '240' ,infoText = ''}: PlaceHolderProps) => {
    
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