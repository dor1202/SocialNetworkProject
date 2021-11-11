import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";

const Error404View = () => {
    return (
        <>
            <div className='mainDiv shadow center'>
                <h1>Error 404</h1>
                <p>The path you are trying to navigate is invalid</p>
                <p>(⌣́_⌣̀)</p>
                <Button><Link to='/LoginPage'>Home</Link></Button>
            </div>
        </>
    );
};

export default Error404View;