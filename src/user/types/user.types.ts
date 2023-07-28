interface RoleType {
  id?: string;
  name: string;
  deescription: string;
  level: number;
}
export interface UserType {
  id?: string;
  email: string;
  password: string;
  name: string;
  role_id: string;
  role: RoleType;
}
