import './WaterButton.css';
import React from "react";

const WaterButton = ({ onclick = undefined, content = '' }) => {
    return (
        <>
            <div className='waterButton' onClick={onclick}>
                <span>{content}</span>
                <div className="liquid"></div>
            </div>
        </>
    );
};

export default WaterButton;