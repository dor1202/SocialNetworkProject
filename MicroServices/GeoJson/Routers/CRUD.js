
const express = require('express');
const router = express.Router();
const GeoLocation = require('@Schema/GeoLocation');
const AwaitHandling = require('@Services/AwaitHandling');

//#region URL EXAMPLES:
/*
    GET: http://localhost:3002/GeoLocation
    GET: http://localhost:3002/GeoLocation/60b6168e8bce50515fa3a60
    POST: http://localhost:3002/GeoLocation
        BODY: 
            {
                "GeoLocationData" : {
                    "postId" : "282",
                    "type" : "jet",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [125.6, 10.1]
                    },
                    "properties": {
                        "name": "Islands"
                    }
                }
            }
    PUT: http://localhost:3002/GeoLocation/60b6168e8bce50515fa3a60
        BODY: 
            {
                "GeoLocationData" : {
                    "postId" : "282",
                    "type" : "jet",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [125.6, 10.1]
                    },
                    "properties": {
                        "name": "Islands"
                    }
                }
            }
    DELETE: http://localhost:3002/GeoLocation/60b6168e8bce50515fa3a60
*/
//#endregion

router.get('/GeoLocation', async (req, res) => {
    const [GeoLocations, failure] = await AwaitHandling(GeoLocation.find({}));
    if(!failure) {
        if (GeoLocations.length != 0) res.send(GeoLocations);
        else res.status(402).json({ res: 'No data found' });
    }
    else res.status(402).json({ res: "Error" });
});

router.get('/GeoLocation/:id?', async (req, res) => {
    const { id } = req.params;
    if (id.length == 24) {
        const [GeoLocationSearchResult, failure] = await AwaitHandling(GeoLocation.find({ _id: id }));
        if(!failure) {
            if (GeoLocationSearchResult.length != 0) res.send(GeoLocationSearchResult[0]);
            else res.status(402).json({ res: 'No data found' });
        }
        else res.status(402).json({ res: "Error in find" });
    }
    else res.status(402).json({ res: "Id isn't valid" });
});

router.post('/GeoLocation', async (req, res) => {
    const { GeoLocationData } = req.body;
    const [GeoLocationSearchResult, failure] = await AwaitHandling(GeoLocation.find({ model: GeoLocationData.model }));
    if (!failure) {
        if(GeoLocationSearchResult.length == 0) {
            const newGeoLocation = new GeoLocation({
                properties: GeoLocationData.properties,
                geometry: GeoLocationData.geometry,
                type: GeoLocationData.type,
                postId: GeoLocationData.postId
            });
            const [success, failure] = await AwaitHandling(newGeoLocation.save());
            if(!failure) res.send('Added');
            else s.status(402).json({ res: "Error in add" });
        }
        else res.status(402).json({ res: "Already exist" });
    }
    else res.status(402).json({ res: "Id error" });
});

router.put('/GeoLocation/:id?', async (req, res) => {
    const { id } = req.params;
    const { GeoLocationData } = req.body;
    const [success, failure] = await AwaitHandling(GeoLocation.findByIdAndUpdate(id, GeoLocationData));
    if (!failure) res.send('updated');
    else s.status(402).json({ res: "Error" });
});

router.delete('/GeoLocation/:id?', async (req, res) => {
    const { id } = req.params;
    const [success, failure] = await AwaitHandling(GeoLocation.findByIdAndDelete(id));
    if (!failure) res.send('deleted');
    else s.status(402).json({ res: "Error" });
});

module.exports = router;