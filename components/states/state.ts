import { atom, selector } from 'recoil';

const themeIdxState = atom({
    key: 'themeIdxState',
    default: 0,
});

export default themeIdxState;