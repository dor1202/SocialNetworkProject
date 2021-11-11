import { Button } from "semantic-ui-react";
import React from "react";

const InvalidTokenPopup = ({ returnToLogin=undefined }) => {

    return (
        <div className='centeredDiv shadow' style={{ padding: '2vw' }}>
            <div>
                <p> JWT token isn't valid or timed out. </p>
                <Button primary onClick={returnToLogin} >
                    Back to login
                </Button>
            </div>
        </div>
    );
};

export default InvalidTokenPopup;