const URL = 'https://d3-api.vercel.app/api/token';
export type Token = {
  uid: number;
  token: string;
};
export default function getUserToken(): Promise<Token> {
  return fetch(URL).then((response) => response.json());
}
