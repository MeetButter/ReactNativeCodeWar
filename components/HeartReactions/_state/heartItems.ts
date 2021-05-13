import { atom } from 'recoil';
export type Heart = {
  id: string;
};
export type Hearts = Heart[];

const heartItems = atom<Hearts>({
  key: 'heartItems',
  default: [],
});

export default heartItems;
