function filterByPublisher(data, publisherData) {
    const r = data.filter(x => x.User.UserName == publisherData);
    return r;
}

function filterByImageTags(data, imageTagsData) {
    let r = [];
    for (let index = 0; index < data.length; index++)
        for (let index1 = 0; index1 < data[index].TagsToPost.length; index1++)
            if (data[index].TagsToPost[index1].Tags.Text == imageTagsData) r.push(data[index]);
    return r;
}

function filterByTaggedUsers(data, taggedUsersData) {
    let r = [];
    for (let index = 0; index < data.length; index++)
        for (let index1 = 0; index1 < data[index].TaggedUsers.length; index1++)
            if (data[index].TaggedUsers[index1].User.UserName == taggedUsersData) r.push(data[index]);
    return r;
}

function filterByDate(data, toDateData, fromDateData) {
    let toDate = Date.parse(toDateData);
    let fromDate = Date.parse(fromDateData);
    return data.filter(x => new Date(x.TimeStamp).getTime() >= fromDate && new Date(x.TimeStamp).getTime() <= toDate);
}

function filterByRadius(data, radiusData, centerData) {
    return data.filter(x =>
        ((x.LocationLan >= centerData[0] - radiusData) || (x.LocationLan <= centerData[0] + radiusData))
        &&
        ((x.LocationLat >= centerData[1] - radiusData) || (x.LocationLat <= centerData[1] + radiusData))
    );
}

function combineData (resultArray) {
    let finalArray = [];
    for (let x = 0; x < resultArray.length; x++) {
        // get some res array
        for (let y = 0; y < resultArray[x].length; y++) {
            // get res element
            for (let z = 0; z < resultArray.length; z++) {
                // check if exist in all other arrays
                const isExist = resultArray[x].filter(h => h == resultArray[x][y]);
                if(isExist.length == 0) break;
                if(z == x && resultArray.length != 1) continue;
                // if exist in all, add to finalArray
                if(z == resultArray.length - 1) finalArray.push(resultArray[x][y]);
            }
        }
    }
    return finalArray;
}

const exportData = {
    filterByTaggedUsers,
    filterByPublisher,
    filterByImageTags,
    filterByRadius,
    filterByDate,
    combineData
};

module.exports = exportData;