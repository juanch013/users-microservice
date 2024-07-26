import { CompanyEntity, RoleEntity, UsersEntity } from "src/entities"
import { UserStatusEnum } from "./enums"

export interface ResponseBase{
    code:number,
    message:string,
    data:any
}

export interface retGetUsersByCredentials{
    username:string
    email:string
    id:string
    roleId:string
    companyId:string,
    status:UserStatusEnum
}

export interface IUserEntity{
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  role: RoleEntity;
}

export interface IRoleEntity{
    id: string;
    name: string;
    users: UsersEntity[];
    company: CompanyEntity;
}

export interface ICompanyEntity{
    id: string;
    name: string;
    roles: RoleEntity[];
}

export interface IGetUsersById{
    ids:String[]
}

export interface userTokenData{
    id:string,
    actionsData:string
}

export interface IResponseHandlerResponse{
    code:number,
    data:any,
    message:string
}

export interface tokenUserData{
    Id: string,
    email: string,
    role:string,
    actions:string
}