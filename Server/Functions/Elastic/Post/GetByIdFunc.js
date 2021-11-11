const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');

async function GetByIdFunc(req, res) {
    const [result, error] = await AwaitHandling(axios.ElasticRequest.get('Post/getById', {params: {id:req.query.id}}));
    if(!error){
        const r = {
            Id: result.data._id,
            UserId: result.data._source.UserId,
            Title: result.data._source.Title,
            Image: result.data._source.Image,
            Description: result.data._source.Description,
            LocationLat: result.data._source.LocationLat,
            LocationLan: result.data._source.LocationLan,
            TimeStamp: result.data._source.TimeStamp,
            IsPublic: result.data._source.IsPublic
        };
        res.status(Status.OK.status).json(r);
    } 
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = GetByIdFunc;