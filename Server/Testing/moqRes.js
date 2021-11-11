let moqRes = {};
moqRes.status = 0;
moqRes.json = {};
moqRes.send = (data)=>{
    moqRes.status = 200;
    moqRes.json = data;
};
module.exports = moqRes;