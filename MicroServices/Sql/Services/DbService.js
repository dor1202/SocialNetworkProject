
const { PrismaClient } = require('@prisma/client');

class DBService {
    static prisma = new PrismaClient();
    
    static UpdateData = async (table, elementParamName, elementData, newElementData) => await this.prisma[table].update({ where: { [elementParamName]: elementData }, data: newElementData});
    
    static DeleteElement = async (table, elementParamName, elementData) => await this.prisma[table].delete({ where: { [elementParamName]: elementData }, });
    
    static FindFirst = async (table, elementParamName, elementData) => await this.prisma[table].findFirst({ where: { [elementParamName]: elementData }});
    
    static FindAll = async (table, elementParamName, elementData) => await this.prisma[table].findMany({ where: { [elementParamName]: elementData }});
    
    static FindGroupByWithWhere = async (table,params,elementParamName,elementData) => await this.prisma[table].groupBy({by:params , where: {[elementParamName]: elementData}});
    
    static AddDataToDb = async (table, elementData) => await this.prisma[table].create({ data: elementData });
    
    static FindGroupBy = async (table,params) => await this.prisma[table].groupBy({by:params});
    
    static GetAllData = async (table) => await this.prisma[table].findMany();

    static GetPrismaClient = () => this.prisma;
}

module.exports = DBService;