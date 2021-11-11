import React, { useEffect, useState } from "react";
import './CommentElement.css';

const CommentElement = ({ text = '', forNewComment = false}) => {
    const [DisplayText, setDisplayText] = useState([]);

    const beforeTag = (myArray, index ,finalTextWithTagsArray, lastPlace) => {
        let place = text.indexOf(myArray[index][0], 0);
        finalTextWithTagsArray.push({ data: text.substring(lastPlace, place) , isMarked: false});
        return {array: finalTextWithTagsArray, place: place};
    };

    const firstSegment = (myArray, index ,finalTextWithTagsArray) => {
        let place = text.indexOf(myArray[index][0], 0);
        finalTextWithTagsArray.push({ data: text.substring(0, place) , isMarked: false});
        return {array: finalTextWithTagsArray, place: place};
    };

    const disassembleTag = (myArray, index, finalTextWithTagsArray) => {
        var myRe1 = /\[(.*?)\]/g;
        var myArray1 = myArray[index][0].match(myRe1);
        let name = myArray1[0].substring(1, myArray1[0].length - 1);
        let isTag = false;
        if(name[0] === '#') isTag = true;
        else name = '@' + name
        finalTextWithTagsArray.push({ data: name , isMarked: true, isTag: isTag});
        return finalTextWithTagsArray;
    };

    const updateText = () => {
        const tmpText = text;
        var myRegex = /\@(.*?)\)/g;
        var myArray = [...tmpText.matchAll(myRegex)];
        let finalTextWithTagsArray = [];
        // push all text
        if (myArray.length === 0) finalTextWithTagsArray.push({ data: text.substring(0, text.length) });
        // disassemble text
        else {
            let lastPlace = 0;
            for (let index = 0; index < myArray.length; index++) {
                if (index === 0) {
                    const res = firstSegment(myArray, index, finalTextWithTagsArray);
                    finalTextWithTagsArray = res.array;
                    lastPlace = res.place + myArray[index][0].length;
                    finalTextWithTagsArray = disassembleTag(myArray, index, finalTextWithTagsArray);
                }
                else {
                    const res = beforeTag(myArray, index, finalTextWithTagsArray, lastPlace);
                    finalTextWithTagsArray = res.array;
                    lastPlace = res.place + myArray[index][0].length;
                    finalTextWithTagsArray = disassembleTag(myArray, index, finalTextWithTagsArray);
                }
            }
            // closing data after last tag
            finalTextWithTagsArray.push({ data: text.substring(lastPlace, text.length) , isMarked: false});
        }
        setDisplayText(finalTextWithTagsArray);
    };

    useEffect(() => {
        updateText();
    }, [text])

    return (
        <div className={forNewComment && 'editComment'}>
            {DisplayText.map(e => {
                if (e.isMarked) {
                    if (e.isTag) {
                        return <span style={{ color: 'blue' }}>{e.data}</span>
                    }
                    else {
                        return <span style={{ color: 'green' }}>{e.data}</span>
                    }
                }
                else
                    return <text>{e.data}</text>
            })}
        </div>
    );
};

export default CommentElement;