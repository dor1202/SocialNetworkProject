import { Button } from "semantic-ui-react";
import React from "react";
import FilterTable from "Components/FilterTable/FilterTable";

const CustomHeader = ({inputPlaceHolder = '', headerContent = '', addData = undefined ,friends=[], emitChange=undefined, searchByProp=''}) => {
    return (
        <>
            <div style={{display: 'flex'}}>
                <h2>{headerContent}</h2>
                <Button style={{left: '81%', position: 'sticky'}} primary onClick={addData}>+</Button>
                <FilterTable tableData={friends} className='leftSide' inputPlaceHolder={inputPlaceHolder}
                propName={searchByProp}
                emitSearchData={(e) => { emitChange(e); }} />
            </div>
        </>
    );
};

export default CustomHeader;