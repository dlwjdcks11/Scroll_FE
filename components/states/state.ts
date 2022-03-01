import { atom, selector } from 'recoil';

export const currentThemeState = atom({
    key: 'currentThemeState',
    default: false,
})

export const filterPrevIndexState = atom({
    key: 'filterPrevIndexState',
    default: -1,
})

export const filterIndexState = atom({
    key: 'filterIndexState',
    default: -1,
})