import MicrophoneToTextButton from "Components/Buttons/MicrophoneToTextButton/MicrophoneToTextButton";
import { Button, Divider, Form, Grid, Input, Radio } from "semantic-ui-react";
import ValidationService from "Services/ValidationService/ValidationService";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import './FilterForm.css';

const FilterForm = ({ submitFilter=undefined }) => {

    // States
    const [ShowMicrophones, setShowMicrophones] = useState(false);
    const [FromDate, setFromDate] = useState(new Date());
    const [TaggedUsers, setTaggedUsers] = useState('');
    const [ToDate, setToDate] = useState(new Date());
    const [WithDate, setWithDate] = useState(false);
    const [Publisher, setPublisher] = useState('');
    const [ImgTags, setImgTags] = useState('');
    const [Radius, setRadius] = useState('');

    //Functions
    const sub = (e) => {
        const isValid = ValidationService.filterFormValidation(Publisher, Radius, ImgTags, TaggedUsers);
        if(isValid) {
            let data = buildFilterData();
            submitFilter(data);
        }
    };

    const buildFilterData = () => {
        let dic = {};
        dic.useDate = false;
        dic.FromDate = new Date();
        dic.ToDate = new Date();
        dic.Publisher = '';
        dic.Radius = '';
        dic.ImgTags = '';
        dic.TaggedUsers = '';
        if(WithDate) {
            dic.FromDate = FromDate;
            dic.ToDate = ToDate;
            dic.useDate = true;
        }
        if(Publisher !== '') dic.Publisher = Publisher;
        if(Radius !== '') dic.Radius = Radius;
        if(ImgTags !== '') dic.ImgTags = '#' + ImgTags;
        if(TaggedUsers !== '') dic.TaggedUsers = TaggedUsers;
        return dic;
    };

    return (
        <Form onSubmit={sub}>
            <Grid columns='equal' divided>
                <Grid.Row>
                    <Grid.Column>
                        From date:
                        <DatePicker disabled={!WithDate} dateFormat="dd/MM/yyyy" selected={FromDate} onChange={(date) => setFromDate(date)} />
                    </Grid.Column>
                    <Grid.Column>
                        To date:
                        <DatePicker disabled={!WithDate} dateFormat="dd/MM/yyyy" selected={ToDate} onChange={(date) => setToDate(date)} />
                    </Grid.Column>
                    <Grid.Column style={{alignSelf:'center'}}>
                        <div style={{left: '23%', position:'relative'}}>
                            With date:
                            <Radio toggle onChange={(date) => setWithDate(!WithDate)} />
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='centeredDiv'>
                            <Button className='microphoneBtn' type='button' toggle color={ShowMicrophones ? 'black' : 'purple'} onClick={() => setShowMicrophones(!ShowMicrophones)}>
                                Use microphone
                            </Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column>
                        Publisher:
                        <Input value={Publisher} className='almostFullWidth' placeholder="Publishers" onChange={(e) => setPublisher(e.target.value)}>
                            <input />
                            <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setPublisher(txt)} />
                        </Input>
                    </Grid.Column>

                    <Grid.Column>
                        Radius:
                        <Input value={Radius} className='almostFullWidth' placeholder="Radius" onChange={(e) => setRadius(e.target.value)}>
                            <input />
                            <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setRadius(txt)} />
                        </Input>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column>
                        Image tags:
                        <Input value={ImgTags} className='almostFullWidth' placeholder="Image tags" onChange={(e) => setImgTags(e.target.value)}>
                            <input />
                            <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setImgTags(txt)} />
                        </Input>
                    </Grid.Column>
                    <Grid.Column>
                        Tagged users:
                        <Input value={TaggedUsers} className='almostFullWidth' placeholder="Tagged users" onChange={(e) => setTaggedUsers(e.target.value)}>
                            <input />
                            <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setTaggedUsers(txt)} />
                        </Input>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column>
                        <Button className='filterBtn' icon='filter' primary type='submit'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    );
};

export default FilterForm;