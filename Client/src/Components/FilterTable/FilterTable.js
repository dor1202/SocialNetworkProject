import { Input } from "semantic-ui-react";
import React from "react";
import './FilterTable.css';

const FilterTable = ({inputPlaceHolder='', className='', tableData = undefined, emitSearchData = undefined, propName = ""}) => {
    const updateTable = (e) => {
        let arr = [];
        for (let index = 0; index < tableData.length; index++) {
            const isIncluded = tableData[index][propName].toLowerCase().startsWith(e.target.value.toLowerCase());
            if(isIncluded) arr.push(tableData[index]);
        }
        emitSearchData(arr);
    };

    return <Input placeholder={inputPlaceHolder} className={className} icon='search' iconPosition='left' onChange={updateTable}/>;
};

export default FilterTable;