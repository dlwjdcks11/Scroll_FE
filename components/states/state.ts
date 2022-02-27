import { atom, selector } from 'recoil';

export const currentThemeState = atom({
    key: 'currentThemeState',
    default: false,
})

export const displayState = atom({
    key: 'displayState',
    default: false,
})