import userProxyService from "Services/ProxyServices/userProxyService";
import sessionStorageAsync from 'Services/SessionServices/SessionStorageServiceAsync';
import LoginForm from "Components/Forms/LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import ShowErrorService from "Services/ShowErrorService/ShowErrorService";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";

const LoginView = () => {

    // States
    const [displayError, setDisplayError] = useState(false);
    const history = useHistory();

    // Functions
    const fillSessionStorageAndNavigate = async (Token, Avatar) => {
        await sessionStorageAsync.SessionStorageAdd('User', Token);
        await sessionStorageAsync.SessionStorageAdd('Avatar', Avatar);
        history.push("/MainPage");
    };

    const usualFormSubmit = async (e) => {
        const user = { Email: e.Email, Password: e.Password };
        const [userId, userIdError] = await AwaitHandling(userProxyService.loginUser(user));
        if(userIdError !== null) { popError(); return; }
        const userIdData = userId.data;
        if (userIdData.Status === true) await fillSessionStorageAndNavigate(userIdData.Token, userIdData.Avatar);
        else popError();
    };

    const googleFormSubmit = async (e) => {
        const [userId, userIdError] = await AwaitHandling(userProxyService.loginGoogle(e.User));
        if(userIdError !== null) { popError(); return; }
        const userIdData = userId.data;
        if (userIdData.Status === true) await fillSessionStorageAndNavigate(userIdData.Token, userIdData.Avatar);
        else popError();
    };

    const facebookFormSubmit = async (e) => {
        const [userId, userIdError] = await AwaitHandling(userProxyService.loginFacebook(e.User));
        if(userIdError !== null) { popError(); return; }
        const userIdData = userId.data;
        if (userIdData.Status === true) await fillSessionStorageAndNavigate(userIdData.Token, userIdData.Avatar);
        else popError();
    };

    const submitUser = (e) => {
        async function submitData() {
            switch (e.Type) {
                case 'form': await usualFormSubmit(e); break;
                case 'google':await googleFormSubmit(e); break;
                case 'facebook': await facebookFormSubmit(e); break;
                default: throw new Error('No type detected');
            }
        }
        submitData();
    };

    const popError = (e) => ShowErrorService(setDisplayError);
    const resetUser = (e) => userProxyService.ResetPasswordMail(e);
    const createUser = (e) => userProxyService.createNewUser(e);

    return (
        <>
            <div className='mainDiv shadow center'>
                <LoginForm
                    submitCreateUser={createUser}
                    submitResetUser={resetUser}
                    submitUser={submitUser}
                    popError={popError}
                    displayError={displayError}
                />
            </div>
        </>
    );
};
export default LoginView;