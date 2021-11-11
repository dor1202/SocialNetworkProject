import CustomHeader from "Components/CustomHeader/CustomHeader";
import { Table, Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import './Groups.css';
import EllipsisBasedWords from "Components/Pipes/EllipsisBasedWords";

const Groups = ({ onDrop = undefined, className = '', groups = [], leaveGroup = undefined, addGroup = undefined }) => {
    const [UpdateTableAfterSearch, setUpdateTableAfterSearch] = useState(false);
    const [CurrentGroups, setCurrentGroups] = useState(groups);
    const [IsHover, _setIsHover] = useState([]);

    useEffect(() => {
        let d = [...IsHover];
            for (let index = 0; index < groups.length; index++) {
                d[index] = false;
            }
        _setIsHover(d);
    }, [groups])

    useEffect(() => {
        setCurrentGroups(groups);
    }, [groups])

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onMouseover = (e) => {
        const d = [...IsHover];
        for (let index = 0; index < d.length; index++) d[index] = false;
        d[e.target.id] = true;
        _setIsHover(d);
    }

    const onMouseout = (e) => {
        const d = [...IsHover];
        d[e.target.id] = false;
        _setIsHover(d);
    }

    return (
        <>
            <div className={`shadow ${className}`}>
                <CustomHeader addData={addGroup} headerContent='Groups' inputPlaceHolder='Search group' friends={groups} emitChange={(e)=>{setCurrentGroups(e);setUpdateTableAfterSearch(!UpdateTableAfterSearch);}} searchByProp='groupName'/>
                <Table color='black'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Group name</Table.HeaderCell>
                            <Table.HeaderCell>Participants</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className='table-body'>
                        {CurrentGroups.map((element, index) => {
                            return (
                                <Table.Row>
                                    <Table.Cell className='customGroupNameCell' id={index.toString()} onMouseEnter={onMouseover}
                                    onMouseLeave={onMouseout}>{IsHover[index] ? element.groupName : (element.groupName !== undefined ? EllipsisBasedWords(element.groupName, 3) : '')}</Table.Cell>
                                    <Table.Cell
                                        onDrop={()=>onDrop(element)}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}>
                                        {element.friends.map((user) => {
                                            return (
                                                <>
                                                    <div className='avatar' dangerouslySetInnerHTML={{ __html: user.image }}></div>
                                                    <span>{user.userName}</span>
                                                </>
                                            );
                                        })}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={() => leaveGroup(element.id)} color='red'>Leave</Button>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
        </>
    );
};

export default Groups;