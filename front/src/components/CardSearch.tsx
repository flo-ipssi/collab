import React from "react";

type CardProfileSearchProps = {
    index: number;
    name: string;
    profession: string;
    imageSrc: string;
    buttonText: string;
    onButtonClick: () => void | undefined;
};

const CardProfileSearch: React.FC<CardProfileSearchProps> = ({
    index,
    name,
    profession,
    imageSrc,
    buttonText,
    onButtonClick,
}) => {
    const profilImage = imageSrc ?? 'https://res.cloudinary.com/dvt0xkd8d/image/upload/v1729586930/colllab/default_logo.png'
    return (
        <div key={index}>
            <img
                alt={name}
                className="w-full h-64 object-cover object-center rounded-lg"
                height="400"
                src={profilImage}
                width="600"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
            <h3 className="text-xl font-bold mb-2 mt-4 text-center">{name}</h3>
            <div className="text-sm font-bold mb-4 mt-1 text-center">{profession}</div>
            <button
                className="text-blue-500 hover:text-blue-700 mt-4 mx-auto block"
                onClick={onButtonClick}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default CardProfileSearch;
