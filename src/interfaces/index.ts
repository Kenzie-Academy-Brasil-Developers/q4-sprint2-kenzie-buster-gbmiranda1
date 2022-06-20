export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  cart: ICart[];
}

export interface IUserCreate {
  email: string;
  name: string;
  password: string;
  isAdm?: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IDvdCreate {
  name: string;
  duration: string;
  quantity: number;
  price: number;
}

export interface ICart {
  id: string;
  paid: boolean;
  total: number;
}

export interface IQuantity {
  quantity: number;
}
