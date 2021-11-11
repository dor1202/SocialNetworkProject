import MicrophoneToTextButton from "Components/Buttons/MicrophoneToTextButton/MicrophoneToTextButton";
import ValidationService from "Services/ValidationService/ValidationService";
import { Button, Dropdown, Form, Input, Message } from "semantic-ui-react";
import ShowErrorService from "Services/ShowErrorService/ShowErrorService";
import WaterButton from "Components/Buttons/WaterButton/WaterButton";
import envExport from "Environment/environment";
import React, { useState } from "react";

const ForgotPasswordForm = ({ resetPassword = undefined }) => {

    // States
    const [ShowMicrophones, setShowMicrophones] = useState(false);
    const [EmailCode, setEmailCode] = useState('@gmail.com');
    const [ShowError, setShowError] = useState(false);
    const [Email, setEmail] = useState('');

    // Functions
    const sub = () => {
        const fullEmail = Email+EmailCode;
        const isValid = ValidationService.forgotPasswordFormValidation(fullEmail);
        if (isValid) resetPassword(fullEmail);
        else ShowErrorService(setShowError);
    };

    return (
        <>
            <Form error={ShowError} onSubmit={sub}>
                <Message error>
                    <Message.Header>We're sorry the email is invalid</Message.Header>
                    <p>Check the email again</p>
                </Message>
                <Button type='button' toggle color={ShowMicrophones?'black':'purple'} onClick={()=> setShowMicrophones(!ShowMicrophones)}>
                    Use microphone
                </Button>
                <Form.Field required>
                    <label>Email</label>
                    <Input icon='user' iconPosition='left' value={Email} onChange={(e) => setEmail(e.target.value)} >
                        <input/>
                        <Dropdown className='dropdownMail' button defaultValue='@gmail.com' options={envExport.emailCodes} onChange={(e) => setEmailCode(e.target.innerText)} search />
                        <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setEmail(txt)} />
                    </Input>
                </Form.Field>
                <div className='centeredDiv'>
                    <WaterButton onclick={sub} content='Reset' />
                </div>
            </Form>
        </>
    );
};

export default ForgotPasswordForm;