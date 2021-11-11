import _ from "lodash";

const tableReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) return { ...state, tableData: state.tableData.slice().reverse(), direction: state.direction === 'ascending' ? 'descending' : 'ascending', }
            return { column: action.column, tableData: _.sortBy(state.tableData, [action.column]), direction: 'ascending', }
        default: throw new Error()
    }
};

const initialState = {
    column: null,
    tableData: [],
    direction: null,
};

const exportData = {
    tableReducer,
    initialState
};

export default exportData;