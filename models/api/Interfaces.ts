export interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface Color {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface CreateUser {
  name: string;
  job: string;
  id: number;
  createdAt: string;
}
