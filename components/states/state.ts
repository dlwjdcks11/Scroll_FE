import { atom, selector } from 'recoil';

export const themeIdxState = atom({
    key: 'themeIdxState',
    default: 0,
});

export const displayState = atom({
    key: 'displayState',
    default: false,
})