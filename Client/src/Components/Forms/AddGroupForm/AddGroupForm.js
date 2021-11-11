import ValidationService from "Services/ValidationService/ValidationService";
import ShowErrorService from "Services/ShowErrorService/ShowErrorService";
import WaterButton from "Components/Buttons/WaterButton/WaterButton";
import { Form, Message } from "semantic-ui-react";
import React, { useState } from "react";

const AddGroupForm = ({ submitGroup = undefined }) => {

    // States
    const [ShowError, setShowError] = useState(false);
    const [GroupName, setGroupName] = useState('');

    // Functions
    const sub = () => {
        const isValid = ValidationService.addGroupValidation(GroupName);
        if(isValid) submitGroup(GroupName);
        else ShowErrorService(setShowError);
    };

    return (
        <>
            <Form error={ShowError}>
                <Message error>
                    <Message.Header>We're sorry the data isn't valid</Message.Header>
                    <p>Make sure you entered a name for the group</p>
                </Message>

                <Form.Field required>
                    <label>Group name</label>
                    <Form.Input icon='group' iconPosition='left' onChange={(e) => setGroupName(e.target.value)} />
                </Form.Field>

                <div className='centeredDiv'>
                    <WaterButton onclick={sub} content='Create group' />
                </div>
            </Form>
        </>
    );
};

export default AddGroupForm;