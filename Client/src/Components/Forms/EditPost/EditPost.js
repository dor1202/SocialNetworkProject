import { Button, Checkbox, Divider, Dropdown, Form, Grid, Image } from "semantic-ui-react";
import React, { useEffect, useRef, useState } from "react";
import jwtDecode from 'Services/JWTService/JWTService';
import WaterButton from "Components/Buttons/WaterButton/WaterButton";
import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import TagInput from "Components/TagInput/TagInput";
import MicrophoneToTextButton from "Components/Buttons/MicrophoneToTextButton/MicrophoneToTextButton";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";
import friendProxyService from "Services/ProxyServices/friendProxyService";

const EditPost = ({ submitPostUpdate = undefined, reIsPublic = false, rePostId = 0, reTitle = '', reDescription = '', reTags = [], reTaggedUsers = [],reImgFile =''}) => {

    // States
    const [ShowMicrophones, setShowMicrophones] = useState(false);
    const [Description, setDescription] = useState('');
    const [ImgFile, setImgFile] = useState('');
    const hiddenFileInput = useRef(undefined);
    const [Title, setTitle] = useState('');
    const avatar = SessionStorageService.getFromSessionStorage('Avatar');
    const [Uploader, setUploader] = useState('');
    const [TaggedUsers, setTaggedUsers] = useState({ id: [] });
    const [Members, setMembers] = useState([]);
    const [Tags, setTag] = useState([]);
    const [PostId, setPostId] = useState(0);
    const [IsPublic, setIsPublic] = useState(false);

    // Functions
    useEffect(() => {
        async function getMembers() {
            const [members, error] = await AwaitHandling(friendProxyService.getMembers());
            const membersData = members.data;
            let tempArr = [];
            for (let index = 0; index < membersData.length; index++) {
                const element = membersData[index];
                for (let y = 0; y < reTaggedUsers.length; y++) {
                    if(reTaggedUsers[y].id === membersData[index].value) {
                        const tmp = TaggedUsers;
                        tmp.id.push(membersData[index].value);
                        setTaggedUsers(tmp)
                    }
                }
                // convert from svg to base 64 string.
                const buff = new Buffer(element.image.src);
                const base64data = buff.toString('base64');
                const stringImage = `data:image/svg+xml;base64,${base64data }`;
                
                tempArr.push({key: element.key, text: element.text, value: element.value, image:stringImage});
            }
 
            setMembers(tempArr);
        }
        getMembers();
        const a = SessionStorageService.getFromSessionStorage('User');
        const a1 = jwtDecode.DecodeToken(a);
        setUploader(a1.userTemplate.UserName);
        setPostId(rePostId);
        setTitle(reTitle);
        setDescription(reDescription);
        setIsPublic(reIsPublic);
        let tmpArr = [];
        for (let index = 0; index < reTags.length; index++) {
            tmpArr.push({id: reTags[index].Id.toString(), text: reTags[index].Text});
        }
        setTag(tmpArr);
        setImgFile(reImgFile);
    }, [])

    const setTags = (e) => setTag(e);
    

    const handleClick = (e) => hiddenFileInput.current.click();

    function getUserToken() {
        const userToken = SessionStorageService.getFromSessionStorage('User');
        const userDecodeToken = jwtDecode.DecodeToken(userToken);
        return userDecodeToken.userTemplate.Id
    }

    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => setImgFile(e.target.result);
        reader.readAsDataURL(fileUploaded);
    };

    const sub = () => {
        if (Description !== '' && Title !== '' && ImgFile !== undefined) {
            const successCallback = (position) => {
                const UserId = getUserToken();
                const Position = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                const post = { PostId,UserId, Description, TaggedUsers, ImgFile, Title, Tags, Position, IsPublic };
                submitPostUpdate(post);
            };
            navigator.geolocation.getCurrentPosition(successCallback, (err) => console.log(err));
        }
    };

    return (
        <>
            <Button type='button' toggle color={ShowMicrophones ? 'black' : 'purple'} onClick={() => setShowMicrophones(!ShowMicrophones)}>
                Use microphone
            </Button>
            <Form onSubmit={sub}>
                <Grid>
                    <Grid.Column width={4}>
                        <Image src={reImgFile} alt='empty' size='small' />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Form.Group className='disableFlex'>
                            <Form.Field>
                                <Form.Field required>
                                    <label>Title</label>
                                    <Form.Input icon='user' iconPosition='left' onChange={(e) => setTitle(e.target.value)} >
                                        <input value={`${Title}`} />
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
                                        <input value={`${Description}`} />
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
                                <Checkbox checked={IsPublic} onChange={() => setIsPublic(!IsPublic)} toggle label={IsPublic? 'Public': 'Private'}/>
                            </div>
                        </Form.Group>
                        <Divider />

                        <Form.Group>
                            <Grid columns={2} className='textGrid'>
                                <Grid.Column>
                                    <Form.Field required>
                                        <label>Tag users</label>
                                        <Dropdown search placeholder='Tagged users' value={TaggedUsers.id} fluid multiple selection options={Members} className="selectCourse" onChange={(e, {value}) => setTaggedUsers({ Id: value })} />
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
                            <WaterButton onclick={sub} content='Update' />
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

export default EditPost;