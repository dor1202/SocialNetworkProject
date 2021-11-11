
const AwaitHandling = async (request) => {
    try{
        const data = await request;
        return [data, null];
    }
    catch(err){
        console.error(err);
        return [null, err];
    }
};

export default AwaitHandling;