const userDb = require('@services/DbService');
const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');

async function GetUserImages(req, res) {
    const {userMail} = req.query;
    const userInDB = await userDb.FindFirst("user", "Email", userMail);
    const [r, e1] = await AwaitHandling(axios.ElasticRequest.get('Post/SearchPost',  {params: {UserId: userInDB.Id}}));
    const images = r.data;
    if(!e1){

        let tmp = [];
        for (let index = 0; index < images.length; index++) {
            tmp.push({
                Id:images[index]._id,
                TimeStamp:images[index]._source.TimeStamp,
                Image: images[index]._source.Image,
                Title: images[index]._source.Title
            });
        }
        // sort by date
        tmp.sort(function(a,b){
            return new Date(b.TimeStamp) - new Date(a.TimeStamp);
        });
        res.send(tmp);
    }
    else{
        res.send('error');
    }
}

module.exports = GetUserImages;