import userViewFunctions from "Components/Views/UserView/UserViewFunctions";
import React, { useEffect, useReducer, useState } from "react";
import FilterTable from "Components/FilterTable/FilterTable";
import TableReducer from "Reducers/TableReducer";
import { Button, Label, Table } from "semantic-ui-react";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";
import friendProxyService from "Services/ProxyServices/friendProxyService";

const AddFriendForm = ({ submitFriend=undefined }) => {

    // States
    let [state, dispatch] = useReducer(TableReducer.tableReducer, TableReducer.initialState);
    const { tableData } = state;
    const [UpdateTableAfterSearch, setUpdateTableAfterSearch] = useState(false);
    const [FullTableData, setFullTableData] = useState([]);
    const [btnContent, setbtnContent] = useState(false);

    // Functions
    useEffect(() => {
        async function fetchData() {
            const [Users, error] = await AwaitHandling(friendProxyService.getMembers());
            if(!error){
                state.tableData = Users.data;
                setFullTableData(Users.data);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <FilterTable
                tableData={FullTableData}
                propName="key"
                emitSearchData={(e) => { state.tableData = e; setUpdateTableAfterSearch(!UpdateTableAfterSearch); }}
            />

            <Button
                primary
                onClick={() => { dispatch({ type: 'CHANGE_SORT', column: 'UserName' }); setbtnContent(!btnContent); }}
            >
                {btnContent ? '↓' : '↑'}
            </Button>
            <Table sortable stackable singleLine color='grey'>
                <Table.Body>
                    {tableData.map((element, index) => {
                        return (
                            <Table.Row key={'row' + index}>
                                <Table.Cell style={{display: 'block ruby'}}>
                                <Label ribbon>
                                    <div className='avatar' dangerouslySetInnerHTML={{ __html: element.image.src }}></div>
                                </Label>
                                    <div>{element.text}</div>
                                </Table.Cell>
                                <Table.Cell textAlign='right'>
                                    <Button color='green' onClick={()=> submitFriend(element.value)}>Add</Button>
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </>
    );
};

export default AddFriendForm;