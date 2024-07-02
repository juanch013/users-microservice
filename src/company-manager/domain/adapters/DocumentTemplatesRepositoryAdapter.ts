import { InjectModel } from "@nestjs/mongoose";
import { DocumentTemplatesRepository } from "../ports/companyService";
import { Model } from "mongoose";
import { DocumentFormat } from "src/schemas/document-format";

export class DocuementTemplateRepositoryAdapter implements DocumentTemplatesRepository{
    constructor(@InjectModel('templates') private DocumentTemplateModel: Model<DocumentFormat>){}
    
    async create(companyId: string, name: string, template: string) {
        try {
            const createdFileFormat = new this.DocumentTemplateModel({name:name,companyId,template});
            return await createdFileFormat.save();
        } catch (error) {
            console.log(error.message,error.stack,"context: create")
            return null
        }
    }

    async findByNameAndCompany(companyId:string,name:string) {
        try {
            return await this.DocumentTemplateModel.findOne({name,companyId})
        } catch (error) {
            console.log(error.message,error.stack,"context: findOne")
            return null
        }
    }

}