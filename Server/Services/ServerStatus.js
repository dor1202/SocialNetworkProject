const Status = {
    OK : {status: 200, message: 'ok'},
    BAD : {status: 400, message: 'bad request'},
    UNAUTHORIZED : {status: 401, message: 'unauthorized'},
    FORBIDDEN : {status: 403, message: 'forbidden'},
    NOTFOUND : {status: 404, message: 'not found'}
};

Object.freeze(Status);

module.exports = Status;