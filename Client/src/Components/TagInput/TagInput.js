import { WithContext as ReactTags } from 'react-tag-input';
import React from "react";
import './TagInput.css';

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
    space: 32
};

const delimiters = [KeyCodes.space];


const TagInput = ({ Tags, setTags }) => {

    // Functions
    const handleDelete = (i) => {
        let tmp = [...Tags];
        for (let index = 0; index < tmp.length; index++) {
            if(index === i) tmp.splice(index,1);
        }
        setTags(tmp);
    };

    const handleAddition = (tag) => {
        tag.id = '#' + tag.id;
        tag.text = '#' + tag.text;
        for (let index = 0; index < Tags.length; index++) {
            if(Tags[index].id === tag.id) return;
        }
        setTags([...Tags,tag]);
    }

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = Tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    }

    return (
        <div>
            <ReactTags
                tags={Tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                delimiters={delimiters} 
                inputFieldPosition="top"
                placeholder='#'/>
        </div>
    );
};

export default TagInput;