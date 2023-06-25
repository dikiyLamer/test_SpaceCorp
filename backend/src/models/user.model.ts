import { Role } from "src/enums/role.enum"

export class UserDTO{
    login: string
    password: string
    roles: Role[]
}