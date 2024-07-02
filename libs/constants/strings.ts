export const QUERY_GET_ALL_USERS_BY_COMPANY = `SELECT u.name as userName, u.email,u.id,r.name as roleName, c.name as companyName
                FROM users u 
                JOIN role r on u.roleId = r.id 
                JOIN company c on r.companyId = c.id
                WHERE c.id = ?`

export const QUERY_GET_ACTIVE_USERS_BY_COMPANY = `SELECT u.name as userName, u.email,u.id,r.name as roleName, c.name as companyName
                FROM users u 
                JOIN role r on u.roleId = r.id 
                JOIN company c on r.companyId = c.id
                WHERE c.id = ? AND
                u.status = '1'`

export const USER_CONTROLLER_ROUTE='users'
export const DBHOST='localhost'
export const DBPORT=3306

/* =================== MODULE CONSTANTS FOR INJECTION =================== */
export const COMPANY_APPLICATION = "COMPANY_APPLICATION";
export const COMPANY_SERVICE = "COMPANY_SERVICE";
export const COMPANY_REPOSITORY = "COMPANY_REPOSITORY";
export const ROLE_APPLICATION = "ROLE_APPLICATION";
export const ROLE_SERVICE = "ROLE_SERVICE";
export const ROLE_REPOSITORY = "ROLE_REPOSITORY";
export const ACTION_APPLICATION = "ACTION_APPLICATION";
export const ACTION_SERVICE = "ACTION_SERVICE";
export const ACTION_REPOSITORY = "ACTION_REPOSITORY";
export const TEMPLATES_REPOSITORY="TEMPLATES_REPOSITORY";

