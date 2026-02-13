
export type Prize = {
  label: string;
  color: string;
};

export type UserPreference = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dob: string;
  religion: string;
  age: number;
  occupation: string;
  size: string;
  style: 'Oversize' | 'Regular Fit' | 'Slim Fit';
};

export enum GameState {
  IDLE = 'IDLE',
  SPINNING = 'SPINNING',
  WON = 'WON',
  COLLECTING_DATA = 'COLLECTING_DATA',
  SUCCESS = 'SUCCESS'
}
