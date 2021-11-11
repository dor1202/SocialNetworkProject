import ResetPasswordForm from "Components/Forms/ResetPasswordForm/ResetPasswordForm";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";
import userProxyService from "Services/ProxyServices/userProxyService";

const ResetPasswordView = () => {

    //States
    let { email } = useParams();
    const history = useHistory();

    //Functions
    const submitResetPassword = async (e) => {
        const [feed, feedError] = await AwaitHandling(userProxyService.ResetPassword(email, e));
        if(!feedError) history.push("/LoginPage");
    };

    return (
        <>
            <div className='mainDiv shadow center'>
                <ResetPasswordForm submitResetPassword={submitResetPassword}/>
            </div>
        </>
    );
};

export default ResetPasswordView;