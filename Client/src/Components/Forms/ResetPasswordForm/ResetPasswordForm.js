import ValidationService from "Services/ValidationService/ValidationService";
import ShowErrorService from "Services/ShowErrorService/ShowErrorService";
import WaterButton from "Components/Buttons/WaterButton/WaterButton";
import { Divider, Form, Message } from "semantic-ui-react";
import React, { useState } from "react";

const ResetPasswordForm = ({ submitResetPassword = undefined }) => {

    //States
    const [PasswordVerify, setPasswordVerify] = useState('');
    const [DisplayError, setDisplayError] = useState(false);
    const [Password, setPassword] = useState('');

    // Functions
    const sub = (e) => {
        const isValid = ValidationService.resetPasswordFormValidation(Password, PasswordVerify);
        if(isValid) submitResetPassword(Password);
        else ShowErrorService(setDisplayError);
    };

    return (
        <>
            <h2 className='textBorder'>Reset password:</h2>
            <Form error={DisplayError} onSubmit={sub}>
                <Divider />
                <Message
                    error
                    header='There was some errors with your submission'
                    list={[
                        'Make sure the password and the second password are the same.',
                    ]}
                />
                <Form.Field required>
                    <label>Password</label>
                    <Form.Input icon='asterisk' iconPosition='left' type='password' onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                <Form.Field required>
                    <label>Password again</label>
                    <Form.Input icon='asterisk' iconPosition='left' type='password' onChange={(e) => setPasswordVerify(e.target.value)} />
                </Form.Field>
                <div className='centeredDiv'>
                    <WaterButton onclick={sub} content='Reset' />
                </div>
            </Form>
        </>
    );
};

export default ResetPasswordForm;