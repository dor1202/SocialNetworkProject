
async function AwaitHandling(request) {
    try{
        const data = await request;
        return [data, null];
    }
    catch(err){ return [null, err]; }
}

module.exports = AwaitHandling;