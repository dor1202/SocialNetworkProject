import CustomHeader from "Components/CustomHeader/CustomHeader";
import { Table, Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import './Groups.css';
import EllipsisBasedWords from "Components/Pipes/EllipsisBasedWords";

const Groups = ({ className = '', groups = [] }) => {
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
                <h2>Groups</h2>
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
                                    <Table.Cell >
                                        {element.friends.map((user) => {
                                            return (
                                                <>
                                                    <div className='avatar' dangerouslySetInnerHTML={{ __html: user.image }}></div>
                                                    <span>{user.userName}</span>
                                                </>
                                            );
                                        })}
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