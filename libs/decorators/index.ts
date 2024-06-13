import { SetMetadata } from "@nestjs/common";

export const AuthGuard = (param:string) => SetMetadata('actionId',param)