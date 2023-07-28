import { RoleType } from 'src/role/types/roleType';
export interface UserType {
  id?: string;
  email: string;
  password: string;
  name: string;
  role_id: string;
  role: RoleType;
}
