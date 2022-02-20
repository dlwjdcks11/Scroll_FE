import { atom, selector } from 'recoil';

const themeState = atom({
    key: 'themeState',
    default: 0,
});

export default themeState;