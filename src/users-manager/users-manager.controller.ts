import  UserManagerService  from './users-manager.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GetUsersByCompanyDto } from './dtos/GetUsersByCompany.dto';
import { GetUsersByIdDto } from './dtos/GetUsersById.dto';
import { AssignRoleDto } from './dtos/AssignRole.dto';
import { ActivateUserDto } from './dtos/ActivateUser.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';
import CONSTANTS from '../../libs/constants'
@Controller(CONSTANTS.STRINGS.USER_CONTROLLER_ROUTE)
export default class UserManagerController {
    constructor(
      private readonly userManagerService:UserManagerService
    ){}

  @Get('get-users-by-company')
  async getAllUsers(@Query() params:GetUsersByCompanyDto) {
    try {
      return await this.userManagerService.getUsersByCompany(params);
    } catch (error) {
      console.log(error.message,"context: getAllUsers")
    }  
  }

  @Get('get-users-by-id')
  async getUserById(@Query() params:GetUsersByIdDto) {
    try {
      return await this.userManagerService.getUserById(params.ids);
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
  async assignRole(@Body() body:AssignRoleDto) {
    try {
      return await this.userManagerService.assignRole(body)
    } catch (error) {
      console.log(error.message,"context: updateUser")
    }  
  }

  @Put('update-pass')
  async updatePass(@Body() body:AssignRoleDto) {
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