import MicrophoneToTextButton from "Components/Buttons/MicrophoneToTextButton/MicrophoneToTextButton";
import { Button, Checkbox, Divider, Dropdown, Form, Grid, Image, Message } from "semantic-ui-react";
import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import ValidationService from "Services/ValidationService/ValidationService";
import ShowErrorService from "Services/ShowErrorService/ShowErrorService";
import WaterButton from "Components/Buttons/WaterButton/WaterButton";
import React, { useEffect, useRef, useState } from "react";
import jwtDecode from 'Services/JWTService/JWTService';
import TagInput from "Components/TagInput/TagInput";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";
import friendProxyService from "Services/ProxyServices/friendProxyService";

const PostForm = ({ submitPost = undefined}) => {

    // States
    const avatar = SessionStorageService.getFromSessionStorage('Avatar');
    const user = SessionStorageService.getFromSessionStorage('User');
    const [ShowMicrophones, setShowMicrophones] = useState(false);
    const [TaggedUsers, setTaggedUsers] = useState({ id: [] });
    const [DisplayError, setDisplayError] = useState(false);
    const [Description, setDescription] = useState('');
    const [Uploader, setUploader] = useState('');
    const [ImgFile, setImgFile] = useState('');
    const [Members, setMembers] = useState([]);
    const hiddenFileInput = useRef(undefined);
    const [Title, setTitle] = useState('');
    const [Tags, setTags] = useState([]);
    const [IsPublic, setIsPublic] = useState(false);

    // Functions
    useEffect(() => {
        async function getMembers() {
            const [members, error] = await AwaitHandling(friendProxyService.getMembers());
            const memberData = members.data;
            let tempArr = [];
            for (let index = 0; index < memberData.length; index++) {
                const element = memberData[index];
                // convert from svg to base 64 string.
                const buff = new Buffer(element.image.src);
                const base64data = buff.toString('base64');
                const stringImage = `data:image/svg+xml;base64,${base64data }`;
                tempArr.push({key: element.key, text: element.text, value: element.value, image:stringImage});
            }
 
            setMembers(tempArr);
        }
        getMembers();
        const a1 = jwtDecode.DecodeToken(user);
        setUploader(a1.userTemplate.UserName);
    }, [])

    useEffect(() => {
        console.log(TaggedUsers);
    }, [TaggedUsers])

    const handleClick = (e) => hiddenFileInput.current.click();

    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => setImgFile(e.target.result);
        reader.readAsDataURL(fileUploaded);
    };

    const sub = () => {
        const isValid = ValidationService.postFormValidation(Description, Title, ImgFile);
        if (isValid) {
            const successCallback = (position) => {
                const userToken = SessionStorageService.getFromSessionStorage('User');
                const userDecodeToken = jwtDecode.DecodeToken(userToken);
                const UserId = userDecodeToken.userTemplate.Id
                const Position = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                const post = { UserId, Description, TaggedUsers, ImgFile, Title, Tags, Position, IsPublic };
                submitPost(post);
            };
            navigator.geolocation.getCurrentPosition(successCallback, (err) => console.log(err));
        }
        else ShowErrorService(setDisplayError);
    };

    return (
        <>
            <Button type='button' toggle color={ShowMicrophones ? 'black' : 'purple'} onClick={() => setShowMicrophones(!ShowMicrophones)}>
                Use microphone
            </Button>
            <Form error={DisplayError} onSubmit={sub}>
                <Message
                    error
                    header='There was some errors with your submission'
                    list={[
                        'Make sure the password and the second password are the same.',
                    ]}
                />
                <Grid>
                    <Grid.Column width={4}>
                        <Image src={ImgFile !== '' ? ImgFile : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='small' />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Form.Group className='disableFlex'>
                            <Form.Field>
                                <Form.Field required>
                                    <label>Title</label>
                                    <Form.Input icon='user' iconPosition='left' onChange={(e) => setTitle(e.target.value)} >
                                        <input value={Title} />
                                        <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setTitle(txt)} />
                                    </Form.Input>
                                </Form.Field>
                            </Form.Field>
                        </Form.Group>
                        <Divider />

                        <Form.Group className='disableFlex'>
                            <Grid.Column>
                                <Form.Field required>
                                    <label>Description</label>
                                    <Form.Input icon='asterisk' iconPosition='left' onChange={(e) => setDescription(e.target.value)} >
                                        <input value={Description} />
                                        <MicrophoneToTextButton styleName={!ShowMicrophones && 'hide'} submitText={(txt) => setDescription(txt)} />
                                    </Form.Input>
                                </Form.Field>
                            </Grid.Column>
                        </Form.Group>
                        <Divider />

                        <Form.Group className='disableFlex'>
                            <Form.Field required className='centeredDiv'>
                                <Button type='button' color='black' onClick={handleClick}>
                                    Upload a file
                                </Button>
                                <input type='file' ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
                            </Form.Field>
                            <div className='centeredDiv'>
                                <Checkbox onChange={() => setIsPublic(!IsPublic)} checked={IsPublic} toggle label={IsPublic? 'Public': 'Private'}/>
                            </div>
                        </Form.Group>
                        <Divider />

                        <Form.Group>
                            <Grid columns={2} className='textGrid'>
                                <Grid.Column>
                                    <Form.Field required>
                                        <label>Tag users</label>
                                        <Dropdown search placeholder='Tag users' value={TaggedUsers.id} fluid multiple selection options={Members} className="selectCourse" onChange={(e, { value }) => setTaggedUsers({ Id: value })} />
                                    </Form.Field>
                                </Grid.Column>

                                <Grid.Column className='downElement'>
                                    <Form.Field required>
                                        <label>Tags</label>
                                        <TagInput Tags={Tags} setTags={setTags} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid>
                        </Form.Group>
                        <Divider />

                        <div className='centeredDiv'>
                            <WaterButton onclick={sub} content='Post' />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className='avatar' dangerouslySetInnerHTML={{ __html: avatar }}></div>

                        {Uploader}
                    </Grid.Column>
                </Grid>
            </Form>
        </>
    );
};

export default PostForm;