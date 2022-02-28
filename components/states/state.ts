import { atom, selector } from 'recoil';

export const currentThemeState = atom({
    key: 'currentThemeState',
    default: false,
})

export const filterIndexState = atom({
    key: 'filterState',
    default: -1,
})

export const checkboxState = atom({
    key: 'checkboxState',
    default: [],
})