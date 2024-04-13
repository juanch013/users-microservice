import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity, UsersEntity } from "src/entities";
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUserDto.cto'
import * as COJNSTANTS from "../../libs/constants";
import handleRsponse from "libs/responseHandler/responseHandler";
import { ActivateUserDto } from "./dtos/ActivateUserDto.dto";
import { AssignRoleDto } from "./dtos/AssignRole.dto";
import { retGetUsersByCredentials } from "libs/constants/interfaces";
/* eslint-disable prettier/prettier */

@Injectable()
export default class UserManagerService {
    constructor(
            @InjectRepository(UsersEntity) 
            private usersRepository: Repository<UsersEntity>,
            @InjectRepository(RoleEntity) 
            private roleRepository: Repository<RoleEntity>
        ){}
        
        async createUser(body:CreateUserDto) {
            try {
                const {role} = body;
                const verifyRole = await this.verifyRole(role);

                if(!verifyRole){
                    return new BadRequestException("The role you are trying to assign to the user do not exist");
                }

                const verifyEmail = await this.usersRepository.exist(
                    {
                        where:{
                            email:body.email,
                            active:true
                        }
                    });
            
                if(verifyEmail){
                    return new BadRequestException("There is a user registered with this email");
                }

                const user = this.mapUserData(body,verifyRole);
                if(user){
                    await this.usersRepository.save(user);

                    const returnData = {
                        name:user.name,
                        role:user.role.name,
                        email:user.email
                    }
                    
                    if(user){
                        return handleRsponse(200,"User registered succesfully",returnData);
                    }
                }

            } catch (error) {
                console.log(error,'contexto: createUser');
            }
        }

        mapUserData(body:CreateUserDto,role:RoleEntity){
            try {
                const userEntity = this.usersRepository.create({
                    name:body.name,
                    email:body.email,
                    password:body.password,
                    role:role,
                })
                return userEntity;
            } catch (error) {
                console.log(error,'contexto: mapUserData');
                return null;
            }
        }

        async activateUser(body:ActivateUserDto){
            try {
                const verifyUser = await this.usersRepository.exist({where:{id:body.ids}})
                if(verifyUser){
                    const updateResponse = await this.usersRepository.update(body.ids,{active:true})
                    if(updateResponse.affected == 1){
                        return handleRsponse(200,"User is now active",{})
                    }
                }
                return new BadRequestException("User do not exist");
            } catch (error) {
                console.log(error,'contexto: activateUser');
            }
        }
      
        async getUsers(id:string): Promise<any> {
            try {
                const query = `SELECT u.name as userName, u.email,u.id,r.name as roleName, c.name as companyName
                FROM users u 
                JOIN role r on u.roleId = r.id 
                JOIN company c on r.companyId = c.id
                WHERE u.id = ?`
                
                const users = await this.usersRepository.query(query,[id])

                if(users.length > 0){
                    return handleRsponse(200,"List of users by id",users)
                }
            } catch (error) {
                console.log(error,'contexto: getUsers');
                
            }
        }
      
        async getUserById(ids: string[]): Promise<COJNSTANTS.INTERFACES.ResponseBase> {
            try {
                const query = `SELECT u.name as userName, u.email,u.id,r.name as roleName, c.name as companyName
                FROM users u 
                JOIN role r on u.roleId = r.id 
                JOIN company c on r.companyId = c.id
                WHERE u.id in (?)`
                
                const users = await this.usersRepository.query(query,[ids])

                if(users.length > 0){
                    return handleRsponse(200,"List of users",users)
                }

            } catch (error) {
                console.log(error,'contexto: getUsers');
            }
        }
      
       async assignRole(body:AssignRoleDto){
            try {
                let errorMessage = '';
                const verifyUser = await this.verifyUser(body.userId);
                if(!verifyUser){
                    return handleRsponse(400,"User do not exist",{})
                }

                const verifyRole = await this.verifyRole(body.roleId);
                if(!verifyRole){
                    return handleRsponse(400,"Role do not exist",{})
                }

                verifyUser.role = verifyRole
                await this.usersRepository.save(verifyUser);
                return handleRsponse(200,"User role updated successfully",verifyUser)
            } catch (error) {
                console.log(error,'contexto: assignRole'); 
            }
       }

        async getUserByCredentials(email:string,password:string): Promise<retGetUsersByCredentials | undefined>{
            try {
                const query = `SELECT u.name as userName, u.email,u.id,r.id as roleId, c.id as companyId
                FROM users u 
                JOIN role r on u.roleId = r.id 
                JOIN company c on r.companyId = c.id
                WHERE u.email = ?
                AND password = ?
                `
                
                const users = await this.usersRepository.query(query,[email,password])

                if(users.length > 0){
                    return users[0]
                }
            } catch (error) {
                console.log(error);
            }
        }

        async verifyRole(role:string):Promise<RoleEntity>{
            try {
                return await this.roleRepository.findOne({where:{id:role}});
            } catch (error) {
                console.log(error,'contexto: getUsers');
            }
        }

        async verifyUser(user:string):Promise<UsersEntity>{
            try {
                return await this.usersRepository.findOne({where:{id:user}});
            } catch (error) {
                console.log(error,'contexto: getUsers');
            }
        }

        async getUsersByCompany(id:string){
            try {
                const query = `SELECT u.name as userName, u.email,u.id,r.name as roleName, c.name as companyName
                FROM users u 
                JOIN role r on u.roleId = r.id 
                JOIN company c on r.companyId = c.id
                WHERE c.id = ?`
                
                const users = await this.usersRepository.query(query,[id])

                if(users.length > 0){
                    return handleRsponse(200,"List of users by company",users)
                }
            } catch (error) {
                console.log(error,'contexto: getUsersByCompany');
            }
        }

        async deleteUser(id:string){
            try {
                if(await this.checkUserExistUnactive(id)){
                    await this.usersRepository.update(id,{active:false})
                    return handleRsponse(200,"user delete successfully",{id})
                }else{
                    return handleRsponse(200,"user could not be deleted",{id})
                }
            } catch (error) {
                console.log(error,'contexto: deactivateUser');
            }
        }

        async checkUserExistUnactive(id:string):Promise<boolean>{
            try {
                return await this.usersRepository.exist({where:{id:id,active:true}})
            } catch (error) { 
                console.log(error,'contexto: checkUserExistUnactive');
            }
        }
}
      



