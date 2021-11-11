import MicrophoneToTextButton from "Components/Buttons/MicrophoneToTextButton/MicrophoneToTextButton";
import { Button, Divider, Dropdown, Form, Grid, Input, Message, Select } from "semantic-ui-react";
import ValidationService from "Services/ValidationService/ValidationService";
import ShowErrorService from "Services/ShowErrorService/ShowErrorService";
import WaterButton from "Components/Buttons/WaterButton/WaterButton";
import "react-datepicker/dist/react-datepicker.css";
import envExport from "Environment/environment";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import './SignUpForm.css';

const SignUpForm = ({ submitUser = undefined }) => {

    // States
    const [ShowMicrophones, setShowMicrophones] = useState(false);
    const [PhoneAreaCode, setPhoneAreaCode] = useState('050');
    const [EmailCode, setEmailCode] = useState('@gmail.com');
    const [PasswordAgain, setPasswordAgain] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [PhoneNumber, setPhoneNumber] = useState(0);
    const [ShowError, setShowError] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [LastName, setLastName] = useState('');
    const [Address, setAddress] = useState('');
    const [Email, setEmail] = useState('');
    const [UseDropdown, setUseDropdown] = useState(true);

    // Functions
    const sub = async () => {
        const fullPhoneNumber = PhoneAreaCode + PhoneNumber;
        let fullEmail = '';
        if(UseDropdown) fullEmail = Email + EmailCode;
        else fullEmail = Email;
        const isValid = ValidationService.signUpFormValidator(UserName, Password, PasswordAgain, fullEmail, FirstName, LastName, Address, fullPhoneNumber);
        if (isValid) {
            const user = { UserName: UserName, Password: Password, Email: Email + EmailCode, FirstName: FirstName, LastName: LastName, Address: Address, PhoneNumber: PhoneAreaCode + PhoneNumber, bday: fromDate, Platform: 'Site' };
            submitUser(user);
        }
        
        else ShowErrorService(setShowError);
    };

    const changeEmail = (e) => {
        const containCode = e.target.value.includes('@');
        if(UseDropdown !== !containCode) setUseDropdown(!containCode);
        setEmail(e.target.value);
    };

    return (
        <>
            <Form error={ShowError} onSubmit={sub}>
                <Message error>
                    <Message.Header>We're sorry the data isn't valid</Message.Header>
                    <p>Check the fields again</p>
                </Message>
                <Button type='button' toggle color={ShowMicrophones?'black':'purple'} onClick={()=> setShowMicrophones(!ShowMicrophones)}>
                    Use microphone
                </Button>
                <Form.Group>
                    <Grid columns={2} className='textGrid'>
                        <Grid.Column>
                            <Form.Field>
                                <Form.Field required>
                                    <label>User name</label>
                                    <Form.Input icon='user' value={UserName} iconPosition='left' onChange={(e) => setUserName(e.target.value)} >
                                        <input />
                                        <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setUserName(txt)} />
                                    </Form.Input>
                                </Form.Field>
                            </Form.Field>
                        </Grid.Column>


                        <Grid.Column>
                            <Form.Field required>
                                <label>Birthday</label>
                                <DatePicker dateFormat="dd/MM/yyyy" selected={fromDate} onChange={(date) => setFromDate(date)} />
                            </Form.Field>
                        </Grid.Column>
                    </Grid>

                </Form.Group>
                <Divider />

                <Form.Group>
                    <Grid columns={3} className='textGrid'>
                        <Grid.Column>
                            <Form.Field required>
                                <label>Password</label>
                                <Form.Input icon='asterisk' iconPosition='left' value={Password}  type='password' onChange={(e) => setPassword(e.target.value)}>
                                    <input />
                                    <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setPassword(txt)} />
                                </Form.Input>
                            </Form.Field>
                        </Grid.Column>

                        <Grid.Column><Divider vertical>And</Divider></Grid.Column>

                        <Grid.Column className='downElement'>
                            <Form.Field required>
                                <label>Password again</label>
                                <Form.Input icon='asterisk' iconPosition='left' value={PasswordAgain} type='password' onChange={(e) => setPasswordAgain(e.target.value)} >
                                    <input />
                                    <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setPasswordAgain(txt)} />
                                </Form.Input>
                            </Form.Field>
                        </Grid.Column>

                    </Grid>
                </Form.Group>
                <Divider />

                <Form.Group>
                    <Grid columns={2} className='textGrid'>
                        <Grid.Column>
                            <Form.Field>
                                <Form.Field required>
                                    <label>Phone number</label>
                                    <div className='thirdInput' style={{ display: 'flex' }}>
                                        <Select search defaultValue='050' options={envExport.PhonesAreaPhoneCodes} onChange={(e) => setPhoneAreaCode(e.target.textContent)} />
                                        <Input type='number' iconPosition='left' value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} >
                                            <input />
                                            <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setPhoneNumber(txt)} />
                                        </Input>
                                    </div>
                                </Form.Field>
                            </Form.Field>
                        </Grid.Column>

                        <Grid.Column>
                            <Form.Field>
                                <Form.Field required>
                                    <label>Email</label>
                                    <Input className='customEmailInput' icon='at' value={Email} onChange={changeEmail} >
                                        <input />
                                        <Dropdown disabled={!UseDropdown} className='dropdownMail' defaultValue='@gmail.com' options={envExport.emailCodes} onChange={(e) => setEmailCode(e.target.innerText)} search />
                                        <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setEmail(txt)} />
                                    </Input>
                                </Form.Field>
                            </Form.Field>
                        </Grid.Column>

                    </Grid>

                </Form.Group>
                <Divider />

                <Form.Group inline>
                    <Grid columns={3} className='textGrid'>
                        <Grid.Column>
                            <Form.Field required>
                                <label>First name</label>
                                <Form.Input className='thirdInput' icon='user circle' iconPosition='left' value={FirstName} onChange={(e) => setFirstName(e.target.value)} >
                                    <input />
                                    <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setFirstName(txt)} />
                                </Form.Input>
                            </Form.Field>
                        </Grid.Column>

                        <Grid.Column className='downElement'>
                            <Form.Field required>
                                <label>Last name</label>
                                <Form.Input className='thirdInput' icon='user circle' iconPosition='left' value={LastName} onChange={(e) => setLastName(e.target.value)} >
                                    <input />
                                    <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setLastName(txt)} />
                                </Form.Input>
                            </Form.Field>
                        </Grid.Column>

                        <Grid.Column>
                            <Form.Field required>
                                <label>Address</label>
                                <Form.Input className='thirdInput' icon='home' iconPosition='left' value={Address} onChange={(e) => setAddress(e.target.value)} >
                                    <input />
                                    <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setAddress(txt)} />
                                </Form.Input>
                            </Form.Field>
                        </Grid.Column>
                    </Grid>
                </Form.Group>
                <Divider />

                <div className='centeredDiv'>
                    <WaterButton onclick={sub} content='Sign up' />
                </div>
            </Form>
        </>
    );
};

export default SignUpForm;