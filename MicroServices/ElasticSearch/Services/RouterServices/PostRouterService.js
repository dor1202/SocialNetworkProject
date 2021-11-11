
const SearchFunc = require('@Functions/PostRouter/SearchFunc');
const CreateFunc = require('@Functions/PostRouter/CreateFunc');
const GetAllFunc = require('@Functions/PostRouter/GetAllFunc');
const DeleteFunc = require('@Functions/PostRouter/DeleteFunc');
const UpdateFunc = require('@Functions/PostRouter/UpdateFunc');
const GetByIdFunc = require('@Functions/PostRouter/GetByIdFunc');

class PostRouterService {
    static GetByIdFunc = (req,res) => GetByIdFunc(req,res);
    static Search = (req,res) => SearchFunc(req,res);
    static Create = (req,res) => CreateFunc(req,res);
    static GetAll = (req,res) => GetAllFunc(req,res);
    static Delete = (req,res) => DeleteFunc(req,res);
    static Update = (req,res) => UpdateFunc(req,res);
}

module.exports = PostRouterService;