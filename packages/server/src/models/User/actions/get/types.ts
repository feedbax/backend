import type { UserModel } from '~models/User';

export interface ValidatePassword {
  (user: UserModel, password: string): Promise<void>;
}

export interface Props {
  id: string | null;
  email: string;
  password: string;
}

type ReturnType = UserModel;

export interface ById {
  (id: Props['id']): Promise<ReturnType>;
}

export interface ByEmail {
  (email: Props['email']): Promise<ReturnType>;
}

export interface ByEmailAndPassword {
  (email: Props['email'], password: Props['password']): Promise<ReturnType>;
}

export interface Get {
  (props: Pick<Props, 'id'>): Promise<ReturnType>;
  (props: Pick<Props, 'email'>): Promise<ReturnType>;
  (props: Pick<Props, 'email' | 'password'>): Promise<ReturnType>;
}
