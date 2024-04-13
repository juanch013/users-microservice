import { CompanyEntity, RoleEntity, UsersEntity } from "src/entities"

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
    companyId:string
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