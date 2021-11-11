import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react';
import './MicrophoneToTextButton.css';

const MicrophoneToTextButton = ({ styleName = '', language = 'en-US', submitText = (txt) => { } }) => {

    // States
    const [ShowLoading, setShowLoading] = useState(false);
    const { browserSupportsContinuousListening, browserSupportsSpeechRecognition, isMicrophoneAvailable, resetTranscript, finalTranscript } = useSpeechRecognition();

    // Functions
    useEffect(() => {
        if (finalTranscript !== '' && ShowLoading) {
            setShowLoading(false);
            submitText(finalTranscript);
            resetTranscript();
        }
    }, [finalTranscript])

    if (!browserSupportsContinuousListening || !browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
        return <Button className={`customMicBtn ${ styleName }`} icon='microphone slash' disabled></Button>;
    }

    const click = () => {
        SpeechRecognition.startListening({ language: language });
        setShowLoading(true);
    };

    // the mic will stop listening after a pause.
    return <Button type='button' className={`customMicBtn ${ styleName }`} icon='microphone' onClick={click} loading={ShowLoading}></Button>;
};

export default MicrophoneToTextButton;