export interface User {
  id: string;
  name: string;
  profile: string;
  email: string;
}

export interface AuthUser {
  token: string;
  user: User;
}


export interface ScriptPage {
  page: number;
  pageSize: number;
  total: number;
  items: ScriptRow[];
}


export interface ScriptRow {
  id: string,
  customerEmail: string,
  step: string,
  date: string
}

interface ErrorDetail {
  message: string;
}

interface ServerResponse {
  message: string;
  status: number;
  errors: ErrorDetail[];
}


