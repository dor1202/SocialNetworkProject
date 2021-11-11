import MicrophoneToTextButton from "Components/Buttons/MicrophoneToTextButton/MicrophoneToTextButton";
import { Button, Divider, Dropdown, Form, Grid, Input, Message } from "semantic-ui-react";
import ValidationService from "Services/ValidationService/ValidationService";
import ForgotPasswordForm from "Components/Forms/ForgotPasswordForm/ForgotPasswordForm";
import FillPopupService from "Services/FillPopupService/FillPopupService";
import WaterButton from "Components/Buttons/WaterButton/WaterButton";
import SignUpForm from "Components/Forms/SignUpForm/SignUpForm";
import FacebookLogin from 'react-facebook-login';
import envExport from "Environment/environment";
import GoogleLogin from "react-google-login";
import Popup from "Components/Popup/Popup";
import React, { useState } from "react";
import './LoginForm.css';

const LoginForm = ({ submitCreateUser = undefined, submitResetUser = undefined, submitUser = undefined, popError = undefined, displayError = undefined }) => {

    // States
    const [CurrentPopupForm, setCurrentPopupForm] = useState(<div></div>);
    const [OpenBeforeTestPop, setOpenBeforeTestPop] = useState(false);
    const [ShowMicrophones, setShowMicrophones] = useState(false);
    const [EmailCode, setEmailCode] = useState('@gmail.com');
    const [PopupHeader, setPopupHeader] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [UseDropdown, setUseDropdown] = useState(true);

    // Functions
    const sub = () => {
        let fullEmail = '';
        if(UseDropdown) fullEmail = Email + EmailCode;
        else fullEmail = Email;
        const isValid = ValidationService.loginFormValidation(fullEmail, Password);
        if (isValid) submitUser({ Email: fullEmail, Password, Type: 'form' });
        else popError();
    };

    const addNewUser = async (e) => {
        await submitCreateUser(e);
        submitUser({ UserName: e.UserName, Password: e.Password, Type: 'form' });
    };

    const resetPassword = (e) => {
        submitResetUser(e);
        setOpenBeforeTestPop(false);
    };

    const changeEmail = (e) => {
        const containCode = e.target.value.includes('@');
        if(UseDropdown !== !containCode) setUseDropdown(!containCode);
        setEmail(e.target.value);
    };

    const ResponseGoogle = (response) => submitUser({ User: response.profileObj, Type: 'google' });
    const responseFacebook = (response) => submitUser({ User: response, Type: 'facebook' });
    const openForgetPasswordPopup = () => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Forget password?', <ForgotPasswordForm resetPassword={resetPassword} />,);
    const openSignUpPopup = () => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Sign up', <SignUpForm submitUser={addNewUser} />);

    return (
        <>
            <h2 className='textBorder'>Login:</h2>
            <Form error={displayError} onSubmit={sub}>
                <Divider />
                <Message
                    error
                    header='There was some errors with your submission'
                    list={[
                        'You must include both a upper and lower case letters in your password.',
                        'You need to select your home country.',
                    ]}
                />
                <Button type='button' toggle color={ShowMicrophones ? 'black' : 'purple'} onClick={() => setShowMicrophones(!ShowMicrophones)}>
                    Use microphone
                </Button>
                <Form.Field required>
                    <label>Email</label>
                    <Input icon='user' iconPosition='left' value={Email} onChange={changeEmail} >
                        <input />
                        <Dropdown disabled={!UseDropdown} className='dropdownMail' button defaultValue='@gmail.com' options={envExport.emailCodes} onChange={(e) => setEmailCode(e.target.innerText)} search />
                        <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setEmail(txt)} />
                    </Input>
                </Form.Field>
                <Form.Field required>
                    <label>Password</label>
                    <Form.Input icon='asterisk' iconPosition='left' type='password' value={Password} onChange={(e) => setPassword(e.target.value)} >
                        <input />
                        <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setPassword(txt)} />
                    </Form.Input>
                </Form.Field>
                <div className='centeredDiv'>
                    <Grid columns={3}>
                        <Grid.Column>
                            <WaterButton onclick={openForgetPasswordPopup} content='Forgot?' />
                        </Grid.Column>
                        <Grid.Column>
                            <WaterButton onclick={sub} content='Login' />
                        </Grid.Column>
                        <Grid.Column>
                            <WaterButton onclick={openSignUpPopup} content='Sign up' />
                        </Grid.Column>
                    </Grid>
                </div>
                <br />
                <div className='centeredDiv'>
                    <Grid columns={1}>
                        <Grid.Column>
                            <GoogleLogin
                                clientId={process.env.REACT_APP_googleOAuthKey}
                                onSuccess={ResponseGoogle}
                                onFailure={ResponseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <FacebookLogin
                                cssClass="customFacebookButtonStyle"
                                appId={process.env.REACT_APP_facebookOAuthKey}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                size="small"
                                textButton="Sign in with facebook"
                            />
                        </Grid.Column>
                    </Grid>
                </div>
            </Form>

            <Popup setPop={() => { setOpenBeforeTestPop(false) }} Pop={OpenBeforeTestPop} header={PopupHeader}>
                {CurrentPopupForm}
            </Popup>
        </>
    );
};

export default LoginForm;