// const GlobalFunctions = require('../../Functions/GlobalFunctions');

// test('Check if string is num falsy', () => {
//     const res = GlobalFunctions.CheckIfStringIsNum('aaa');
//     expect(res).toBeFalsy();
// });

// test('Check if string is num truthy', () => {
//     const res = GlobalFunctions.CheckIfStringIsNum('111');
//     expect(res).toBeTruthy();
// });

// test('Get current time string', () => {
//     const res = GlobalFunctions.GetCurrentTimeString();
//     let date = new Date();
//     const expected =  date.getHours() + ':' + date.getMinutes() + ' ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
//     expect(res).toBe(expected);
// });

// test('Convert time string to date', () => {
//     const dateString = GlobalFunctions.GetCurrentTimeString();
//     const res = GlobalFunctions.ConvertTimeStringToDate(dateString);
//     expect(res).toStrictEqual(new Date());
// });

// test('Find json data by id', () => {
//     const data =[{Id: 0}];
//     const res = GlobalFunctions.FindJsonData(data , 0);
//     expect(res).toStrictEqual({Id : 0});
// });

// test('Find json data by email', () => {
//     const data =[{EmailAddress: 0}];
//     const res = GlobalFunctions.FindJsonDataByEmail(data , 0);
//     expect(res).toStrictEqual({EmailAddress : 0});
// });

// test('Find json data by test history', () => {
//     const data ={TestHistory: [{TestId: 0}]};
//     const res = GlobalFunctions.FindJsonDataInTestHistory(data , 0);
//     expect(res).toStrictEqual({TestId : 0});
// });

// test('Find json data by course', () => {
//     const data ={Courses: [{Id: 0}]};
//     const res = GlobalFunctions.FindJsonDataInCourse(data , 0);
//     expect(res).toStrictEqual({Id : 0});
// });

// test('Find json data by test', () => {
//     const data ={Tests: [{Id: 0}]};
//     const res = GlobalFunctions.FindJsonDataInTests(data , 0);
//     expect(res).toStrictEqual({Id : 0});
// });

// test('Delete element in json', () => {
//     const data =[{Id: 0},{Id: 1}];
//     const res = GlobalFunctions.DeleteElementInJson(data , 0);
//     expect(res).toStrictEqual([{Id : 1}]);
// });

// test('Get json prop data', () => {
//     const data = {};
//     const res = GlobalFunctions.GetJsonPropData(data , 0);
//     expect(res).toBe(0);
// });

test('EmptyTest', () => {
});