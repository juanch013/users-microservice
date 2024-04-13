// controllers/user.controller.ts
import { Request, Response } from 'express';
import  UserManagerService  from './users-manager.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { INTERFACES } from '../../libs/constants/index'
import { CreateUserDto } from './dtos/CreateUserDto.cto';
import { ActivateUserDto } from './dtos/ActivateUserDto.dto'
import { GetUsersByIdDto } from './dtos/GetUsersDto.dto';
import { GetUsersByCompanyDto } from './dtos/GetUsersByCompanyDto.dto'
import { AssignRoleDto } from './dtos/AssignRole.dto';
@Controller('users')
export default class UserManagerController {
    constructor(
      private readonly userManagerService:UserManagerService
    ){}

  @Post('get-users-by-company')
  async getAllUsers(@Body() body:GetUsersByCompanyDto) {
    try {
      return await this.userManagerService.getUsersByCompany(body.id);
    } catch (error) {
      console.log(error.message,"context: getAllUsers")
    }  
  }

  @Post('get-users-by-id')
  async getUserById(@Body() body:GetUsersByIdDto) {
    try {
      return await this.userManagerService.getUserById(body.ids);
    } catch (error) {
      console.log(error.message,"context: getUserById")
    }  
   
  }

  @Post('create')
  async createUser(@Body() body:CreateUserDto) {
    try {
        return await this.userManagerService.createUser(body);
    } catch (error) {
      console.log(error.message,"context: createUser")
    }  
  }

  @Post('activate-user')
  async activateUser(@Body() body:ActivateUserDto) {
    try {
        return await this.userManagerService.activateUser(body);
    } catch (error) {
      console.log(error.message,"context: createUser")
    }  
  }

  @Put('assign-role')
  async assignRole(body:AssignRoleDto) {
    try {
      return await this.userManagerService.assignRole(body)
    } catch (error) {
      console.log(error.message,"context: updateUser")
    }  
  }

  @Delete("delete-user/:id")
  async deleteUser(@Param('id') id:string) {
    try {
      console.log(id);
      return await this.userManagerService.deleteUser(id);
    } catch (error) {
      console.log(error.message,"context: deleteUser")
    }  
  };
}