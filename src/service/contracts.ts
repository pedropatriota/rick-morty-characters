export interface ICharacterProps {
  name: string;
  id: number;
  image: string;
}

export interface IApiResponse {
  info: {
    next: string | null;
  };
  results: ICharacterProps[];
}
